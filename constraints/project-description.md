# Project Description: paybyapp-test-checkout-page

## What This Project Is

`paybyapp-test-checkout-page` is a React 18 single-page application that demonstrates and exercises the Paydeet "Pay by App" checkout plugin (`@devheit/paydeet-pay-by-app-plugin`). It is a sandbox storefront — not a production e-commerce site — used to validate that the plugin works correctly when embedded in a typical React + React Bootstrap application.

## Domain Coverage

| Domain | Key Entities |
|--------|-------------|
| **Storefront** | Static product catalogue (Coffee, Sunglasses, Camera) |
| **Cart** | In-memory cart items (`{ id, quantity }`), totals in NGN |
| **Checkout** | Paydeet plugin invocation with `amount`, `apiKey`, `currency`, `businessId` |
| **Result pages** | `/success` and `/cancel` redirects from the plugin |

## Architecture

- **Type**: Client-only SPA bootstrapped via Create React App; no SSR, no backend in this repo
- **Routing**: `BrowserRouter` from `react-router-dom` v6 with three routes (`/`, `/success`, `/cancel`)
- **State**: React Context (`CartContext`) holds the cart; product catalogue is a static JS module
- **UI**: React Bootstrap components on top of Bootstrap 5 CSS
- **Payments**: Calls `PaydeetPlugin.checkout(...)` from the navbar cart modal — the plugin handles the entire payment UI itself
- **Folder structure**:
  - `src/App.js` — root component
  - `src/CartContext.js` — cart provider
  - `src/productsStore.js` — static catalogue + `getProductData(id)`
  - `src/components/` — `Navbar.js`, `ProductCard.js`, `CartProduct.js`
  - `src/pages/` — `Store.js`, `Success.js`, `Cancel.js`
  - `src/lib/utils.js` — `formatCurrency(amount, currency)`

## External Integrations

- **Paydeet Pay by App plugin** (`@devheit/paydeet-pay-by-app-plugin@0.0.7`)
  - Entry point: `PaydeetPlugin.checkout({ amount, apiKey, currency, businessId })`
  - Currently called from `src/components/Navbar.js` with the demo API key `"123456789ab"` and a per-session random `businessId`
  - Redirects to `/success` or `/cancel` after the in-plugin flow

## Tech Stack Summary

| Layer | Technology |
|-------|-----------|
| Framework | React 18.2 |
| Language | JavaScript (JSX) — no TypeScript |
| Build | `react-scripts` 5.0.1 (Create React App) |
| Routing | `react-router-dom` 6.4 |
| UI | `react-bootstrap` 2.5 + `bootstrap` 5.2 |
| State | React Context API |
| Testing | Jest + `@testing-library/react` 13, `@testing-library/jest-dom`, `@testing-library/user-event` |
| Package manager | npm |
| Node.js | LTS (>= 18 recommended by CRA 5) |

## Repository Location

`/Users/temidayoomoyajowo/development/paybyapp-test-checkout-page`

## Entry Points

- App bootstrap: `src/index.js`
- Root component: `src/App.js`
- Dev server: `npm start` (port 3000 — CRA default)
- Production build: `npm run build` → `build/`
- Unit tests: `npm test`
