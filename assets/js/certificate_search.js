document.getElementById('certificate-search-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const eventUrl = document.getElementById('event').value;
    const name = document.getElementById('name').value.trim();
    const searchPattern = new RegExp(name.replace(/\s+/g, '_'), 'i');

    fetch(eventUrl)
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch event directory.');
            return response.json();
        })
        .then(json_response => {
            // Find matching certificates by comparing names with search pattern
            const matchingIndices = json_response
                .map((item, index) => searchPattern.test(item.name) ? index : -1)
                .filter(index => index !== -1);

            if (matchingIndices.length > 0) {
                // Clear and show results container
                const previewsContainer = document.getElementById('certificate-previews');
                previewsContainer.innerHTML = '';
                previewsContainer.classList.remove('hidden');
                document.getElementById('no-result').classList.add('hidden');

                // Handle grid columns based on results count
                previewsContainer.classList.remove("lg:grid-cols-1", "lg:grid-cols-2", "lg:grid-cols-3");
                previewsContainer.classList.add(
                    matchingIndices.length === 1 ? "lg:grid-cols-1" :
                    matchingIndices.length === 2 ? "lg:grid-cols-2" :
                    "lg:grid-cols-3"
                );

                document.getElementById('search_result').classList.remove('hidden');

                // Create preview cards for matches
                matchingIndices.forEach(index => {
                    const item = json_response[index];
                    const card = document.createElement('div');
                    card.className = 'border border-gray-300 rounded shadow p-4';

                    card.innerHTML = `
                        <iframe src="https://docs.google.com/gview?url=${item.download_url}&embedded=true" allow="*" class="w-full h-50 mb-4" frameborder="0"></iframe>
                        <p class="text-sm font-medium truncate">${item.name.replace(/_/g, ' ')}</p>
                        <a href="${item.download_url}" download class="block bg-green-600 text-white text-center px-4 py-2 mt-2 rounded hover:bg-blue-700">
                            Download
                        </a>
                    `;

                    previewsContainer.appendChild(card);
                });

                previewsContainer.scrollIntoView({ behavior: 'smooth' });
            } else {
                // Show no results message
                document.getElementById('search_result').classList.add('hidden');
                document.getElementById('certificate-previews').classList.add('hidden');
                document.getElementById('no-result').classList.remove('hidden');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('certificate-previews').classList.add('hidden');
            document.getElementById('no-result').classList.remove('hidden');
        });
});
