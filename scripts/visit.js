document.querySelectorAll('.place').forEach(place => {
    place.addEventListener('mouseover', () => {
        place.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    });
    place.addEventListener('mouseout', () => {
        place.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    });
});