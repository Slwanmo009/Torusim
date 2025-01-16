const hotels = [
    {
        name: "فندق حديث",
        image: "images/hotel1.jpg",
        rating: 4,
        reviews: 30,
        amenities: ["إفطار", "حديقة", "واي فاي مجاني"],
        price: 100,
        url: "page1.html",
        location: { lat: 15.5007, lng: 32.5599 } // موقع الفندق على الخريطة
    },
    {
        name: "كارما Nubian Rest-house 2",
        image: "images/hotel2.jpg",
        rating: 4,
        reviews: 115,
        amenities: ["إفطار", "حديقة", "واي فاي مجاني"],
        price: 80,
        url: "page2.html",
        location: { lat: 15.6097, lng: 32.5333 } // موقع الفندق على الخريطة
    }
    // أضف المزيد من الفنادق هنا
];

// تهيئة الخريطة
function initMap() {
    const mapOptions = {
        center: { lat: 15.5007, lng: 32.5599 }, // مركز الخرطوم
        zoom: 12
    };
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
    hotels.forEach(hotel => {
        const marker = new google.maps.Marker({
            position: hotel.location,
            map: map,
            title: hotel.name
        });
        const infoWindow = new google.maps.InfoWindow({
            content: `<h3>${hotel.name}</h3><p>${hotel.amenities.join(', ')}</p>`
        });
        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    });
}

// عرض نتائج البحث
document.getElementById('search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const query = document.getElementById('search-input').value.toLowerCase();
    const results = hotels.filter(hotel => hotel.name.toLowerCase().includes(query));
    displayResults(results);
});

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    if (results.length > 0) {
        results.forEach(hotel => {
            const hotelCard = document.createElement('div');
            hotelCard.classList.add('hotel-card');
            
            hotelCard.innerHTML = `
                <img src="${hotel.image}" alt="${hotel.name}">
                <h3>${hotel.name}</h3>
                <p class="rating">${'★'.repeat(hotel.rating)} (${hotel.reviews} تقييم)</p>
                <p>وسائل الراحة: ${hotel.amenities.join(', ')}</p>
                <p>السعر: ${hotel.price} درهم / الليلة</p>
                <a href="${hotel.url}" target="_blank">عرض التفاصيل</a>
            `;
            resultsContainer.appendChild(hotelCard);
        });
    } else {
        resultsContainer.textContent = 'لم يتم العثور على نتائج.';
    }
}

// عرض الخيارات حسب المكان
document.getElementById('location-filter').addEventListener('change', (e) => {
    const selectedLocation = e.target.value;
    const results = selectedLocation === 'all' ? hotels : hotels.filter(hotel => hotel.location === selectedLocation);
    displayResults(results);
});
