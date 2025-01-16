document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('comment-form');
    const photoGrid = document.getElementById('photo-grid');
    const commentList = document.getElementById('comment-list');
    const visitBtn = document.getElementById('visit-btn');
    const notVisitBtn = document.getElementById('not-visit-btn');

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
            // مسح حقل التعليق وإخفاء الرسالة بعد الإرسال
            document.getElementById('visitor-photo').value = '';
            document.getElementById('comment').value = '';

            // إضافة التعليق الجديد إلى القائمة
            if (formData.get('comment')) {
                const newComment = document.createElement('p');
                newComment.innerHTML = `<strong>زائر:</strong> ${formData.get('comment')}`;
                commentList.appendChild(newComment);
            }

            // إضافة الصورة الجديدة إلى الشبكة
            if (formData.get('visitor-photo')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const newImg = document.createElement('img');
                    newImg.src = e.target.result;
                    newImg.alt = 'Visitor Photo';
                    photoGrid.appendChild(newImg);
                };
                reader.readAsDataURL(formData.get('visitor-photo'));
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    // تحديث عدد الزيارات عند النقر على الأزرار
    visitBtn.addEventListener('click', () => {
        updateVisitCount('visit');
        visitBtn.classList.add('visited');
        notVisitBtn.classList.remove('visited');
    });

    notVisitBtn.addEventListener('click', () => {
        updateVisitCount('notVisit');
        notVisitBtn.classList.add('visited');
        visitBtn.classList.remove('visited');
    });

    function updateVisitCount(type) {
        fetch(`http://localhost:5000/updateVisitCount?type=${type}`, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});