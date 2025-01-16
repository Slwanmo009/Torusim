const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

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

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

