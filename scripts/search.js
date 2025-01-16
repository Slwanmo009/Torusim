async function searchFiles(query) {
    const response = await fetch('/most_visited');
    const places = await response.json();
    return places.filter(place => place.name.toLowerCase().includes(query.toLowerCase()));
}

document.getElementById('search-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = document.getElementById('search-input').value;
    const results = await searchFiles(query);
    displayResults(results);
});

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    if (results.length > 0) {
        results.forEach(result => {
            const link = document.createElement('a');
            link.href = result.url;
            link.textContent = result.name;
            resultsContainer.appendChild(link);
            resultsContainer.appendChild(document.createElement('br'));
        });
    } else {
        resultsContainer.textContent = 'No results found.';
    }
}