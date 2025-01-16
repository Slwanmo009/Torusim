CREATE DATABASE IF NOT EXISTS my_database;

-- استخدام قاعدة البيانات
USE my_database;

-- إنشاء جدول الأماكن السياحية إذا لم يكن موجودًا
CREATE TABLE IF NOT EXISTS places (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    page VARCHAR(255) NOT NULL
);

-- إضافة بعض البيانات التجريبية لجدول الأماكن السياحية
INSERT INTO places (name, name_en, page) VALUES 
('جبل مرة', 'Jebel Marra', 'jebel_marra.html'),
('معبد آمون في جبل البركل', 'Amun Temple at Jebel Barkal', 'amun_temple_jebel_barkal.html'),
('جزيرة سنقنيب', 'Sanganeb Island', 'sanganeb_island.html');

-- إنشاء جدول الرسائل إذا لم يكن موجودًا
CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);