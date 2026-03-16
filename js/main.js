document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('plugin-grid');

    fetch('./data/plugin-cards.json')
        .then(response => {
            if (!response.ok) throw new Error("JSON not found");
            return response.json();
        })
        .then(data => {
            data.forEach(plugin => {
                const card = document.createElement('div');
                card.className = 'card';
                
                const statusClass = `status-${plugin.status.toLowerCase().replace(/\s+/g, '-')}`;
                
                card.innerHTML = `
                    <div class="card-header">
                        <div class="tag">${plugin.category}</div>
                        <span class="status-bubble ${statusClass}">${plugin.status}</span>
                    </div>
                    <h3>${plugin.title}</h3>
                    <p>${plugin.description}</p>
                    <div class="links">
                        <a href="${plugin.githubUrl}" class="btn btn-primary">Source Code</a>
                        <a href="${plugin.docsUrl}" class="btn btn-secondary"> ${plugin.docsUrl == "#" ? "Docs Pending" : "Documentation"}</a>
                    </div>
                `;
                grid.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading plugin data:', error));
});