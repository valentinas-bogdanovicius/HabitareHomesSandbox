
# Habitare Homes Website

## 1. Project Overview

This project is the official website for **Habitare Homes**, a UK-based company focused on building and managing Shared Ownership and Affordable Rental homes. The website serves as the company's primary digital presence.

**Core Purpose:**
- To inform potential and current residents about Habitare Homes' mission, properties, and services.
- To provide access to important company documents such as annual reports, financial statements, and resident policies.
- To showcase the company's property portfolio and development locations.
- To offer customer service information, particularly regarding the complaints process.

**Target Audience:**
- Prospective homebuyers and renters.
- Current tenants and leaseholders.
- Local authorities, housing associations, and development partners.
- Investors and regulatory bodies.

---

## 2. Technical Stack & Architecture

The website is a **static HTML site**. There is no server-side backend, database, or complex build process involved. It is rendered entirely on the client-side.

-   **Core Technology:** HTML5, CSS3, vanilla JavaScript.
-   **CSS Framework:** **Bootstrap 5.1.3** is used for the grid system and responsive components (like the collapsible mobile navigation). The primary custom styling is located in `assets/app.css`.
-   **JavaScript Libraries:**
    -   **Leaflet.js (v1.7.1):** Used for the interactive maps on the homepage and portfolio page to display property locations. Map data (coordinates, names) is hardcoded in the `<script>` tags of the pages that use it.
    -   **Bootstrap.min.js:** Provides interactivity for Bootstrap components.
    -   **Cookiebot (`uc.js`, `cd.js`):** Manages cookie consent and script blocking.
    -   **Google Analytics (`gtag/js`):** For website traffic analysis.
-   **Architecture - "Component" Loading:**
    -   The project uses a simple, client-side templating mechanism via `load_components.js`.
    -   On page load, this script uses `fetch()` to dynamically load `header.htm` and `footer.htm` into placeholder `<div>` elements (`<div id="header-placeholder"></div>`).
    -   This script also handles setting the `active` class on the current navigation link by inspecting the current URL pathname.
    -   **Crucially, this means any changes to the main navigation or footer must be made in `header.htm` and `footer.htm` respectively.**
-   **Build & Deployment:**
    -   There is no build process. The site is a collection of static files.
    -   The `launch.bat` file (`python -m http.server 8000`) indicates the project is developed and tested using a simple local Python web server, which is standard for static sites.

---

## 3. Key Features & Pages

The site is structured into several key pages, with content being almost entirely static.

-   **`index.htm` (Homepage):** The main landing page. Features a hero section, mission statement, and an interactive Leaflet.js map showcasing property locations.
-   **`who-we-are/index.htm`:** "About Us" page with details on the company's mission and profiles of the board members.
-   **`portfolio/index.htm`:** Displays the property portfolio, including another instance of the Leaflet.js map and a list of developments with the number of homes at each.
-   **`report/index.htm`:** A document repository page. It provides links to download PDF and XLSM files for Annual Reports, Tenant Satisfaction Measures (TSM), and quarterly Transparency Reports.
-   **`csr/index.htm`:** (Corporate Social Responsibility) Details the company's approach to governance, diversity, and environmental/social impact.
-   **`customer-service/index.htm`:** Provides detailed information on the complaints process, links to managing agent websites, and links to various policy documents (PDFs/DOCX).
-   **`elvinas-surprise/index.htm`:** A recently added static content page.
-   **`privacy-notice/index.htm` & `cookie-policy/index.htm`:** Standard legal and compliance pages.

---

## 4. Content & Data Sources

-   **Textual Content:** Hardcoded directly into the `.htm` files.
-   **Documents:** A significant amount of user-facing information is contained within documents stored in `assets/files/`. This includes all policies, financial reports, and survey results. **When asked about policy details, the correct action is to find and reference the relevant file, not to parse the HTML.**
-   **Map Data:** Property locations and names for the Leaflet.js maps are hardcoded in JavaScript arrays within the HTML files that display a map (e.g., `index.htm`, `portfolio/index.htm`).
-   **Images:** All images are static assets located in `assets/img/`.

---

## 5. Non-Functional Requirements (NFRs)

When creating development tickets, consider the following NFRs:

-   **Responsiveness:** The site uses Bootstrap and custom media queries. All changes must be fully responsive and tested on both mobile (e.g., 375px width) and desktop (e.g., 1440px width) viewports. The collapsible navigation on mobile is a key feature to maintain.
-   **Browser Compatibility:** The site should function correctly on modern versions of Chrome, Firefox, Safari, and Edge. The use of vanilla JS and Bootstrap 5 ensures good compatibility, but new features should be checked.
-   **Performance:** As a static site, performance is a key advantage. New images should be optimized for the web. Avoid adding large, render-blocking scripts.
-   **Accessibility (A11y):** Changes should adhere to WCAG 2.1 AA standards. This includes using semantic HTML, ensuring proper color contrast, adding `alt` text for images, and using ARIA attributes where necessary (e.g., `aria-current="page"` is already in use for navigation).
-   **Maintainability:**
    -   Adhere to the existing component structure. Do not hardcode the header or footer into new pages; use the placeholder `div`s.
    -   New CSS rules should be added to `assets/app.css` and follow the existing style and naming conventions.

---

## 6. Instructions for the AI Business Analyst

-   **To Add/Modify a Page:** Create a new `.htm` file in the appropriate directory. Copy the structure from an existing page (e.g., `elvinas-surprise/index.htm`), ensuring it includes the `header-placeholder` and `footer-placeholder` divs and links to the core JS/CSS files with the correct relative paths.
-   **To Add/Modify Navigation:** Edit the `<nav>` element within **`header.htm`**. The `load_components.js` script will automatically handle applying the `active` class to the correct link.
-   **To Answer Policy/Report Questions:** Do not scan the HTML. Locate the relevant document in `assets/files/` and inform the user that the information is available in that downloadable file.
-   **To Modify the Map:** The list of cities and their coordinates are in a JavaScript array inside a `<script>` tag in the HTML files that contain the map (`index.htm`, `portfolio/index.htm`).
-   **Dependencies:** Remember, there is no package manager (`npm`, `yarn`). All dependencies are included as static files in the repository. Do not suggest installing packages.
