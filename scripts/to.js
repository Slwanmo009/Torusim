const images = document.querySelectorAll('.image-gallery img');
let currentImage = 0;

function showImage(index) {
    images.forEach((img, i) => {
        img.style.display = (i === index) ? 'block' : 'none';
    });
}

function nextImage() {
    currentImage = (currentImage + 1) % images.length;
    showImage(currentImage);
}

// بدء عرض الشرائح تلقائيًا
setInterval(nextImage, 3000);
showImage(currentImage);

// نصائح تفاعلية للزوار
const tips = document.querySelectorAll('.content-section ul li');
tips.forEach(tip => {
    tip.addEventListener('click', () => {
        tip.classList.toggle('highlight');
    });
});

// إضافة أكواد الخريطة
if (document.getElementById('map')) {
    const mapElements = document.querySelectorAll('[data-lat][data-lng]');
    mapElements.forEach(el => {
        const lat = el.getAttribute('data-lat');
        const lng = el.getAttribute('data-lng');
        const map = L.map(el).setView([lat, lng], 12);

        // إضافة طبقة الخريطة
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // إضافة علامة للموقع
        L.marker([lat, lng]).addTo(map)
            .bindPopup(`<b>${el.getAttribute('data-name')}</b><br>Sudan.`)
            .openPopup();
    });
}