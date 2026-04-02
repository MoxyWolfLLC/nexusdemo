# SAMS Wireframes

Interactive wireframes for the SAMS Reseller Client Management feature.

## Setup

```bash
cd wireframes
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) to see the index page with links to both wireframes.

## Deploy to GitHub Pages

The `vite.config.js` base path is set to `/nexusdemo/wireframes/`. After building:

```bash
npm run build
```

Copy the `dist/` contents to wherever you're serving from, or push and let the existing GitHub Actions workflow handle it.

## Screens

### Reseller Portal (`reseller.html`)
What reseller partners see: Dashboard, Clients (with drill-down), Payouts, Reports, Settings.

### Admin Portal (`admin.html`)
What OpenControls sees: Resellers (with drill-down), All Reseller Clients, Direct Customers, Products, Billing.

## Notes
- 30% flat commission rate throughout
- Mock data uses defense contractor client names
- All navigation and filters are functional
- Built with React 18 + Vite + Tailwind CSS 4