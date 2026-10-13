# Want or Need

A tiny shopping-cart app: add items as a want (yellow) or need (green), set a want limit (0–100) per trip, get a reminder for every want past it, and keep a searchable history of finished carts. Open carts close automatically after 5 hours.

- Everything is in `index.html` (plain HTML/CSS/JS, no libraries). `sw.js` lets it open offline.
- All cart data is stored only on the phone (browser local storage). Nothing is sent anywhere.
- `dev/` holds the development copy and the stress-test harness (`dev/test.html`).

Live at GitHub Pages once enabled: Settings → Pages → Deploy from branch → `main` / root.
