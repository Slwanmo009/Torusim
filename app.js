const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const multer = require('multer');

// إعداد bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

// إعداد اتصال قاعدة البيانات
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Slwanmo009$$', // ضع كلمة المرور الخاصة بك هنا
    database: 'my_database'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// إعداد multer لتخزين الملفات
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // سيتم إنشاء المجلد uploads تلقائيًا عند رفع أول صورة
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// معالجة طلبات /search للبحث في قاعدة البيانات
app.get('/search', (req, res) => {
    const query = req.query.q;
    const sql = "SELECT name, name_en, page FROM places WHERE name LIKE ? OR name_en LIKE ?";
    db.query(sql, [`%${query}%`, `%${query}%`], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// معالجة طلبات /contact لتخزين الرسائل
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    const sql = 'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)';
    db.query(sql, [name, email, message], (err, result) => {
        if (err) throw err;
        res.send('Message received and stored!');
    });
});

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

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

