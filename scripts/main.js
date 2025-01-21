document.addEventListener('DOMContentLoaded', () => {
    const visitorPhotos = document.getElementById('visitor-photos');
    const visitorComments = document.getElementById('visitor-comments');

    // تحميل البيانات من الخادم
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            // عرض الصور
            data.photos.forEach(photo => {
                const img = document.createElement('img');
                img.src = photo.url;
                img.alt = 'Visitor Photo';
                visitorPhotos.appendChild(img);
            });

            // عرض التعليقات
            data.comments.forEach(comment => {
                const commentDiv = document.createElement('div');
                commentDiv.className = 'comment-item';
                commentDiv.textContent = comment.text;
                visitorComments.appendChild(commentDiv);
            });

            // إعداد شريط التمرير
            setInterval(() => {
                const activePhoto = document.querySelector('.slideshow img.active');
                if (activePhoto) {
                    let nextPhoto = activePhoto.nextElementSibling;
                    if (!nextPhoto) {
                        nextPhoto = visitorPhotos.firstElementChild;
                    }
                    activePhoto.classList.remove('active');
                    nextPhoto.classList.add('active');
                }
            }, 3000); // تغيير الصورة كل 3 ثواني
        })
        .catch(err => console.error(err));
});
