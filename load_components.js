document.addEventListener("DOMContentLoaded", function() {
    // Determine the path prefix for relative links based on the current page's location.
    // If the path contains more than one '/', it's in a subdirectory.
    const path = window.location.pathname;
    const pathPrefix = ((path.match(/\//g) || []).length > 1) ? '../' : '';

    function loadComponent(url, elementId) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                const element = document.getElementById(elementId);
                if (element) {
                    // Prepend the path prefix to all relative href/src attributes in the fetched HTML.
                    // This regex excludes absolute URLs (http/https), mailto links, and anchor links (#).
                    const modifiedHtml = html.replace(/(href|src)="(?!https?:\/\/|#|mailto:)([^\"]+)"/g, `$1="${pathPrefix}$2"`);
                    element.innerHTML = modifiedHtml;

                    // After loading the header, add the 'active' class to the current page's navigation link.
                    if (elementId === 'header-placeholder') {
                        const currentPathname = window.location.pathname.replace(/index\.htm$/, '').replace(/\/$/, '');
                        const links = element.querySelectorAll('a');

                        links.forEach(link => {
                            // Using link.href provides the full absolute URL, which is then parsed
                            // to get a clean pathname for comparison.
                            let linkPathname = new URL(link.href).pathname.replace(/index\.htm$/, '').replace(/\/$/, '');
    
                            if (linkPathname === currentPathname) {
                                link.classList.add('active');
                                link.setAttribute('aria-current', 'page');
                            }
                        });
                    }

                    // If this is the header, and the page contains a map container, initialize the Leaflet map.
                    if (elementId === 'header-placeholder' && document.getElementById('map')) {
                        // This is a known workaround for some Leaflet issues.
                        delete L.Icon.Default.prototype._getIconUrl;

                        // Correctly set map icon paths, prepending the pathPrefix.
                        L.Icon.Default.mergeOptions({
                            iconUrl: pathPrefix + 'assets/img/marker-icon.png',
                            shadowUrl: pathPrefix + 'assets/img/marker-shadow.png'
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
                        cities.map(c =>
                            L.marker(c.coords)
                                .addTo(map)
                                .bindTooltip(`${c.name}`)
                        );
                    }
                }
            })
            .catch(error => console.error(`Error loading component from ${url}:`, error));
    }

    // Load header and footer components.
    // The URLs are relative to the root of the site.
    loadComponent('/header.htm', 'header-placeholder');
    loadComponent('/footer.htm', 'footer-placeholder');
});