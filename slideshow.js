document.querySelectorAll('.slideshow').forEach(slideshow => {
    let images = slideshow.querySelectorAll('img');
    let currentImageIndex = 0;

    function showImage(index) {
        images.forEach((img, i) => {
            img.classList.remove('active');
            if (i === index) {
                img.classList.add('active');
            }
        });
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showImage(currentImageIndex);
    }

    showImage(currentImageIndex);
    setInterval(nextImage, 3000); // Change image every 3 seconds
});
document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('comment-form');
    const photoGrid = document.getElementById('photo-grid');
    const commentList = document.getElementById('comment-list');

    // استرجاع التعليقات والصور عند تحميل الصفحة
    fetch('http://localhost:5000/comments')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                // إضافة الصور إلى الشبكة
                if (item.imageUrl) {
                    const img = document.createElement('img');
                    img.src = `http://localhost:5000${item.imageUrl}`;
                    img.alt = 'Visitor Photo';
                    photoGrid.appendChild(img);
                }
                
                // إضافة التعليقات إلى القائمة
                const comment = document.createElement('p');
                comment.innerHTML = `<strong>زائر:</strong> ${item.comment}`;
                commentList.appendChild(comment);
            });
        });

    // إرسال التعليقات والصور
    commentForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(commentForm);
        fetch('http://localhost:5000/comments', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            // تحديث الصفحة لعرض التعليقات والصور الجديدة
            location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
