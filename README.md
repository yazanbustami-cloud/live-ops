# Petra Ride — Live Operations dashboard

Static page on Cloudflare Pages, fed by 14 Metabase public questions, auto-refresh every 5 minutes.

## Files
- `index.html` — the dashboard (Chart.js + PapaParse from jsDelivr)
- `functions/mb/[id].js` — Metabase CSV proxy (avoids browser CORS); only the 14 allowed UUIDs pass
- `functions/_middleware.js` — optional Basic-auth login; active only when `DASH_USER` and `DASH_PASS` are set (Pages → Settings → Variables and secrets, Production)
- `_headers` — no-cache on the page, no-store on `/mb/*`

## Deploy
Commit to `main` on the connected repo; Pages builds with no build command and output directory `/`.

## Adding a question
Add its UUID to `ALLOWED` in `functions/mb/[id].js` and to `SOURCES` in `index.html`.
Column names are matched case/space-insensitively (`%` → `pct`, `#` → `n`), so renaming display labels in Metabase is safe, but changing the underlying meaning is not.
