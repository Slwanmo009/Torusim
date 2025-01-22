CREATE DATABASE IF NOT EXISTS my_database;

-- استخدام قاعدة البيانات
USE my_database;

CREATE TABLE IF NOT EXISTS photos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

