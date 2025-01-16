const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// الاتصال بقاعدة البيانات
mongoose.connect('mongodb://localhost:27017/tourism', { useNewUrlParser: true, useUnifiedTopology: true });

const commentSchema = new mongoose.Schema({
    comment: String,
    imageUrl: String
});

const Comment = mongoose.model('Comment', commentSchema);

// إعداد Multer لتحميل الصور
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// واجهة برمجة التطبيقات لتحميل التعليقات والصور
app.post('/comments', upload.single('visitor-photo'), (req, res) => {
    const newComment = new Comment({
        comment: req.body.comment,
        imageUrl: req.file ? `/uploads/${req.file.filename}` : null
    });

    newComment.save()
        .then(() => res.json({ message: 'Comment added successfully!' }))
        .catch(err => res.status(400).json('Error: ' + err));
});

// واجهة برمجة التطبيقات لاسترجاع التعليقات
app.get('/comments', (req, res) => {
    Comment.find()
        .then(comments => res.json(comments))
        .catch(err => res.status(400).json('Error: ' + err));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});