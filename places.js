document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('results');

    // البحث عند كتابة أي حرف
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim();

        if (query.length > 0) {
            fetch(`/search?q=${query}`)
                .then(response => response.json())
                .then(data => {
                    resultsContainer.innerHTML = '';
                    if (data.length > 0) {
                        data.forEach(place => {
                            const resultItem = document.createElement('div');
                            resultItem.className = 'result-item';
                            resultItem.innerHTML = `
                                <a href="${place.page}">${place.name} (${place.name_en})</a>
                            `;
                            resultsContainer.appendChild(resultItem);
                        });
                    } else {
                        resultsContainer.innerHTML = '<p>No results found.</p>';
                    }
                })
                .catch(error => console.error('Error:', error));
        } else {
            resultsContainer.innerHTML = '';
        }
    });

    // إخفاء نتائج البحث عند النقر خارجه
    document.addEventListener('click', (e) => {
        if (!searchForm.contains(e.target) && !searchInput.contains(e.target)) {
            resultsContainer.innerHTML = '';
        }
    });
});
