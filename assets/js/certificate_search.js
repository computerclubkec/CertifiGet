document.getElementById('certificate-search-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const eventUrl = document.getElementById('event').value; // Selected event URL
    const name = document.getElementById('name').value.trim(); // Name entered by user
    const searchPattern = new RegExp(name.replace(/\s+/g, '_'), 'i'); // Create a case-insensitive search pattern

    fetch(eventUrl) // Fetch the event directory
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch event directory.');
            return response.text(); // Get the response as plain text (HTML)
        })
        .then(html => {
            // Parse the HTML to find all PDF links
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const links = Array.from(doc.querySelectorAll('a[href$=".pdf"]')); // Get all links ending with '.pdf'

            // Filter PDFs that match the name pattern
            const matchingCertificates = links.filter(link => searchPattern.test(link.getAttribute('href')));

            if (matchingCertificates.length > 0) {
                // Clear previous results
                document.getElementById('certificate-previews').innerHTML = '';
                document.getElementById('certificate-previews').classList.remove('hidden');
                document.getElementById('no-result').classList.add('hidden');

                // Display previews for each matching certificate
                matchingCertificates.forEach(link => {
                    const pdfPath = link.getAttribute('href');
                    const fileName = pdfPath.split('/').pop();

                    const card = document.createElement('div');
                    card.className = 'border border-gray-300 rounded shadow p-4';

                    card.innerHTML = `
                        <iframe src="${eventUrl+pdfPath}" class="w-full h-50 mb-4" frameborder="0"></iframe>
                        <p class="text-sm font-medium truncate">${fileName.replace("%20"," ")}</p>
                        <a href="${eventUrl+pdfPath}" download class="block bg-green-600 text-white text-center px-4 py-2 mt-2 rounded hover:bg-blue-700">
                            Download
                        </a>
                    `;

                    document.getElementById('certificate-previews').appendChild(card);
                });
            } else {
                // Show "no results" message
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