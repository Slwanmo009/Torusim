const express = require('express');
const multer = require('multer');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = 3000;

// إعداد اتصال قاعدة البيانات
const db = mysql.createConnection({
    host: 'localhost',
    user: 'your-username',
    password: 'your-password',
    database: 'tourism'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database.');
});

// إعداد multer لتخزين الملفات
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// تمكين قراءة البيانات من النموذج
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// تقديم الملفات الثابتة
app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));

// معالجة رفع الصور
app.post('/upload-photo', upload.single('photo'), (req, res) => {
    const url = '/uploads/' + req.file.filename;
    const sql = 'INSERT INTO photos (url) VALUES (?)';
    db.query(sql, [url], (err, result) => {
        if (err) throw err;
        res.redirect('/reviews.html'); // إعادة توجيه بعد التحميل
    });
});

// معالجة إضافة التعليقات
app.post('/add-comment', (req, res) => {
    const text = req.body.text;
    const sql = 'INSERT INTO comments (text) VALUES (?)';
    db.query(sql, [text], (err, result) => {
        if (err) throw err;
        res.redirect('/reviews.html'); // إعادة توجيه بعد الإضافة
    });
});

// الحصول على الصور والتعليقات
app.get('/data', (req, res) => {
    const photosSql = 'SELECT * FROM photos';
    const commentsSql = 'SELECT * FROM comments';
    db.query(photosSql, (err, photos) => {
        if (err) throw err;
        db.query(commentsSql, (err, comments) => {
            if (err) throw err;
            res.json({ photos, comments });
        });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
