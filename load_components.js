document.addEventListener("DOMContentLoaded", function() {
    function loadComponent(url, elementId, adjustPath = true) {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                const element = document.getElementById(elementId);
                if (element) {
                    element.innerHTML = html;

                    // Highlight active menu item
                    const currentPathname = window.location.pathname.replace(/index\.htm$/, '').replace(/\/$/, '');
                    const links = element.querySelectorAll('a');

                    links.forEach(link => {
                        let linkPathname = new URL(link.href).pathname.replace(/index\.htm$/, '').replace(/\/$/, '');

                        if (linkPathname === currentPathname) {
                            link.classList.add('active');
                            link.setAttribute('aria-current', 'page');
                        }
                    });

                    // If this is the header, and it contains the map container, initialize the map
                    if (elementId === 'header-placeholder' && document.getElementById('map')) {
                        delete L.Icon.Default.prototype._getIconUrl;
                        L.Icon.Default.mergeOptions({
                            iconUrl: '/assets/img/marker-icon.png',
                            shadowUrl: '/assets/img/marker-shadow.png'
                        });
                        const tilesUrl = 'https://{s}.tile.osm.org/{z}/{x}/{y}.png';
                        const map = L.map('map').setView([52.5, -1], 7);
                        L.tileLayer(tilesUrl).addTo(map);

                        const cities = [
                            { name: 'Atelier, Lewes', coords: [50.8664, -0.0229] },
                            { name: 'Alconbury Weald, Crest Nicholson', coords: [52.3758, -0.2403] },
                            { name: 'Dysart Road, Grantham', coords: [52.9100, -0.6734] },
                            { name: 'Campbell Wharf', coords: [52.0499, -0.7367] },
                            { name: 'Towergate, Crest Nicholson', coords: [52.0313, -0.6788] },
                            { name: 'Coombe Farm, Saltdean', coords: [50.8127, -0.0253] },
                            { name: 'Tattenhoe Park, Crest Nicholson', coords: [51.9936, -0.8046] },
                            { name: 'Old Malling Farm, Lewes', coords: [50.885099, 0.002584] },
                            { name: 'Stanhope Gardens, Aldershot', coords: [51.25757190399515, -0.7646997198857641] }
                        ];
                        const markers = cities.map(c =>
                            L.marker(c.coords)
                                .addTo(map)
                                .bindTooltip(`${c.name}`)
                        );
                    }
                }
            })
            .catch(error => console.error(`Error loading component from ${url}:`, error));
    }

    // Load header
    loadComponent('/header.htm', 'header-placeholder', false);
    // Load footer
    loadComponent('/footer.htm', 'footer-placeholder', false);
}); 