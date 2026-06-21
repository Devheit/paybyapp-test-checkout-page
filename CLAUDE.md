# CLAUDE.md — paybyapp-test-checkout-page

This file is the entry point for Claude Code when working in this repository. Read it first.

---

## What This Project Is

`paybyapp-test-checkout-page` is a small React 18 single-page application that demonstrates an end-to-end checkout flow integrated with the Paydeet "Pay by App" plugin (`@devheit/paydeet-pay-by-app-plugin`). It serves as a reference / sandbox storefront used to validate the plugin against a real React + React Bootstrap stack.

The app sells three demo products (Coffee, Sunglasses, Camera), tracks a shopping cart in React Context, and triggers the Paydeet checkout from the navbar cart modal.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18.2 |
| Language | JavaScript (ES2020, JSX) — no TypeScript |
| Build / Dev server | `react-scripts` 5.0.1 (Create React App) |
| Routing | `react-router-dom` 6.4 |
| UI Kit | `react-bootstrap` 2.5 + `bootstrap` 5.2 CSS |
| State | React Context API (`CartContext`) — no Redux |
| Payments | `@devheit/paydeet-pay-by-app-plugin` 0.0.7 |
| Testing | Jest + `@testing-library/react` 13, `@testing-library/jest-dom`, `@testing-library/user-event` |
| Package manager | npm (a `package-lock.json` is checked in) |

---

## Repository Layout

```
paybyapp-test-checkout-page/
├── CLAUDE.md                        ← you are here
├── .claude/                         ← Claude Code configuration
│   └── skills/
│       ├── _shared/                 ← skill template + learning protocol
│       ├── paybyapp-checkout-web/   ← React/JS frontend specialist
│       ├── paybyapp-checkout-planner/ ← planning + spec decomposition
│       └── paybyapp-checkout-e2e/   ← Puppeteer E2E specialist
├── constraints/                     ← project-wide rules the skills must follow
│   ├── project-description.md
│   ├── general-constraints.md
│   ├── react-constraints.md
│   └── e2e-constraints.md
├── project-state.md                 ← current phase / active work
├── public/                          ← CRA public assets
├── src/
│   ├── App.js                       ← root component, BrowserRouter + routes
│   ├── CartContext.js               ← cart state provider
│   ├── productsStore.js             ← static product catalogue
│   ├── components/
│   │   ├── Navbar.js                ← navbar + cart modal + Paydeet checkout trigger
│   │   ├── ProductCard.js
│   │   └── CartProduct.js
│   ├── pages/
│   │   ├── Store.js                 ← product grid (index route)
│   │   ├── Success.js               ← /success route
│   │   └── Cancel.js                ← /cancel route
│   └── lib/utils.js                 ← formatCurrency helper
└── package.json
```

---

## Run, Build, Test

```bash
# install
npm install

# dev server (http://localhost:3000)
npm start

# production build
npm run build

# unit tests
npm test
```

---

## Working in This Repo with Claude Code

The `.claude/skills/` directory contains three specialist agents. Pick the one that matches the work:

| Skill | When to use |
|-------|-------------|
| `paybyapp-checkout-planner` | Multi-step changes, new features, refactors — decompose into specs before code is written |
| `paybyapp-checkout-web` | All React/JSX/component/state/styling/unit-test work |
| `paybyapp-checkout-e2e` | Puppeteer browser flows covering the cart → checkout journey |

Every skill begins by reading its constraint files in `constraints/` and the relevant `knowledge.md`. **No implementation may begin without an approved spec.**

---

## Key Rules at a Glance

- **Never** call the Paydeet plugin with a hard-coded production `apiKey`; use the demo key already in `Navbar.js` (`"123456789ab"`) or a `.env`-loaded value.
- **Never** commit live merchant secrets.
- The cart total is computed by `CartContext.getTotalCost()` — always pass it through `formatCurrency()` for display.
- Currency is **NGN** (Naira) across the app; do not hard-code other currencies in new code.
- All interactive UI elements should expose a stable `data-testid` so the E2E suite can target them.
- Stick to React Bootstrap components; do not introduce a competing UI kit (MUI, Chakra, etc.).
- This is a JavaScript codebase — do not introduce TypeScript files without an architectural decision recorded in `project-state.md`.

---

## External Integrations

- **Paydeet Pay by App plugin** — npm `@devheit/paydeet-pay-by-app-plugin`. Invoked via `PaydeetPlugin.checkout({ amount, apiKey, currency, businessId })` in `src/components/Navbar.js`. After the user completes (or cancels) the in-plugin flow, they are redirected back to `/success` or `/cancel`.

---

## Useful Files for First-Time Readers

- `src/App.js` — application shell and routes
- `src/CartContext.js` — cart provider API (`addOneToCart`, `removeOneFromCart`, `deleteFromCart`, `getTotalCost`)
- `src/components/Navbar.js` — where the Paydeet checkout is triggered
- `src/productsStore.js` — static catalogue
- `constraints/react-constraints.md` — coding rules the web skill enforces

---

*Maintained as part of the td-orchestrator skill ecosystem. Update this file when project structure, tech stack, or top-level conventions change.*
