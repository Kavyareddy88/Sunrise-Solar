# Sunrise Solar multi-page website

Pages: Home 1, Home 2, About Us, Services, Savings Calculator, Projects Gallery, Blog, Blog Detail and Contact.

Shared CSS: `assets/css/style.css`. Separate page CSS files are linked from each page. `assets/js/main.js` handles responsive navigation, persistent dark/light mode, RTL direction, calculator, gallery filters and demo form behavior.

Open `index.html` or serve this folder with `python -m http.server 8000`.

Brand colors are `--primary` (solar green) and `--secondary` (sun gold) at the top of `assets/css/style.css`. Update these two variables to change the theme. The contact form is demo-only until connected to Netlify Forms, Formspree or a backend. Calculator values are illustrative only. Gallery images are sample visuals; replace them with actual project photographs before publication.


## Latest visual update
Header now uses a local SVG logo image, a Home dropdown with Home 1 / Home 2, and a clean light footer inspired by the supplied reference. The Gallery link replaces Projects in the navigation. The two brand accent colors remain solar green and sun gold.
