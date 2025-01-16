document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('results');

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();

        fetch(`/search?q=${query}`)
            .then(response => response.json())
            .then(data => {
                resultsContainer.innerHTML = '';
                if (data.length > 0) {
                    data.forEach(place => {
                        const resultItem = document.createElement('div');
                        resultItem.innerHTML = `<p>Found: ${place.name} (${place.name_en})</p><a href="${place.page}">Click here to view</a>`;
                        resultsContainer.appendChild(resultItem);

                        // إضافة استماع للنقر على الروابط لإعادة التوجيه
                        resultItem.querySelector('a').addEventListener('click', (e) => {
                            e.preventDefault();
                            window.location.href = place.page;
                        });
                    });
                } else {
                    resultsContainer.innerHTML = '<p>No results found.</p>';
                }
            })
            .catch(error => console.error('Error:', error));
    });

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim();

        if (query.length === 0) {
            resultsContainer.innerHTML = '';
            return;
        }

        fetch(`/search?q=${query}`)
            .then(response => response.json())
            .then(data => {
                resultsContainer.innerHTML = '';
                if (data.length > 0) {
                    data.forEach(place => {
                        const resultItem = document.createElement('div');
                        resultItem.innerHTML = `<p>Found: ${place.name} (${place.name_en})</p><a href="${place.page}">Click here to view</a>`;
                        resultsContainer.appendChild(resultItem);

                        // إضافة استماع للنقر على الروابط لإعادة التوجيه
                        resultItem.querySelector('a').addEventListener('click', (e) => {
                            e.preventDefault();
                            window.location.href = place.page;
                        });
                    });
                } else {
                    resultsContainer.innerHTML = '<p>No results found.</p>';
                }
            })
            .catch(error => console.error('Error:', error));
    });
});
