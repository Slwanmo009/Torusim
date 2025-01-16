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
