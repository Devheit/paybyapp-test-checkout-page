# General Constraints: paybyapp-test-checkout-page

These constraints apply to all work on `paybyapp-test-checkout-page` regardless of which skill is executing.

---

## Environment & Tooling

- **Node.js**: LTS, >= 18 (required by Create React App 5 and modern `@testing-library/*`)
- **Package manager**: **npm** — a `package-lock.json` is checked in. Do not introduce yarn or pnpm without updating `project-state.md`.
- **Install dependencies**: `npm install`
- **Run dev server**: `npm start` (port 3000)
- **Run unit tests**: `npm test`
- **Production build**: `npm run build`

## Code Quality Gates

```bash
npm test -- --watchAll=false   # Jest tests must pass
npm run build                  # production build must succeed with no warnings
```

- CRA's built-in ESLint config (`react-app`, `react-app/jest`) must remain clean — no new ESLint warnings on changed files
- Do **not** run `npm run eject` — it locks the project out of `react-scripts` upgrades

## JavaScript / React

- Codebase is **JavaScript (JSX)** — no TypeScript files in `src/` without explicit architectural approval
- Use **function components + hooks** — no class components for new code
- Follow CRA's React 18 idioms: `createRoot` (already wired in `src/index.js`), no `ReactDOM.render`
- Use ES2020+ syntax (optional chaining, nullish coalescing, async/await) — avoid `var`

## State Management

- Cart state lives in `CartContext` — do **not** introduce Redux, Zustand, Recoil, etc.
- Product data is a static module (`productsStore.js`) — if a real backend is added, do so via a new `api/` module and a single `useProducts()` hook; do not scatter `fetch` calls inside components

## UI / Styling

- Use **React Bootstrap** components for new UI; do not introduce MUI, Chakra, Tailwind, Ant Design, etc.
- Global styles live in `src/App.css` and `src/index.css`
- Bootstrap 5 utility classes are allowed in `className`
- Currency is rendered via `formatCurrency(amount, "NGN")` from `src/lib/utils.js` — do not call `Intl.NumberFormat` directly in components

## Payments

- The only payment integration is `@devheit/paydeet-pay-by-app-plugin`
- All checkout invocations must pass `{ amount, apiKey, currency: "NGN", businessId }` — keep the shape stable
- **Never commit live merchant API keys**. The current `"123456789ab"` value is a documented test key
- `businessId` should be unique per checkout attempt — the existing pattern (`BIZ-<rand>-<timestamp>`) is acceptable

## Testing

- **Unit/integration**: Jest + `@testing-library/react` 13. Test files: `*.test.js` co-located with source or under `src/__tests__/`
- **Selectors in tests**: prefer `getByRole`, `getByLabelText`, `getByText` — fall back to `getByTestId` for non-semantic nodes
- All interactive elements should carry a stable `data-testid` for E2E reuse
- `npm test` must pass with no `console.error` noise in the test output

## Environment Variables

- CRA reads `REACT_APP_*` env vars from `.env`, `.env.local`, etc. — never read other prefixes from `process.env` in the browser bundle
- Do not commit `.env.local` or any file containing secrets (already in `.gitignore`)

## Security

- Do not log full cart contents, API keys, or `businessId` strings to the production console
- Validate that `cart.getTotalCost()` is `> 0` before invoking `PaydeetPlugin.checkout` to avoid zero-amount transactions
- Sanitise any future user-supplied text before rendering it as HTML — do not use `dangerouslySetInnerHTML` with untrusted input

## Dependencies

- Add new dependencies with `npm install` (prod) or `npm install --save-dev` (dev)
- Keep `react-scripts` on the latest 5.x — do not pin below the current version
- Avoid adding jQuery, Lodash, Moment.js — prefer native browser APIs

## Git & CI

- Do not commit `build/`, `node_modules/`, `.env.local`, or `.DS_Store`
- Lockfile (`package-lock.json`) **must** be committed alongside dependency changes
