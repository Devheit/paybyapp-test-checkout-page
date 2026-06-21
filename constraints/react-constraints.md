# React Constraints: paybyapp-test-checkout-page

These constraints govern all React/JSX development within `paybyapp-test-checkout-page`.

---

## Components

- **Function components only** — no class components for new code
- Use hooks (`useState`, `useEffect`, `useContext`, `useMemo`, `useCallback`) — no `componentDidMount`-style work
- One component per file; file name matches the default export and uses PascalCase (`ProductCard.js`, `CartProduct.js`)
- Keep components small and focused — extract subcomponents when a JSX block grows past ~80 lines or a single responsibility is duplicated

## State Management

### Cart state — `CartContext`
- All cart reads/writes go through `useContext(CartContext)` — do **not** lift duplicate cart state into other components
- The `CartContext` value shape is fixed (`items`, `getProductQuantity`, `addOneToCart`, `removeOneFromCart`, `deleteFromCart`, `getTotalCost`) — adding fields requires updating the default context value in `CartContext.js` and all consumers
- Cart mutations must use the existing helpers — never call `setCartProducts` from outside `CartProvider`

### Local component state — `useState`
- Use `useState` for transient UI state (modal open/closed, form input values)
- Avoid syncing the same piece of state into both `useState` and `CartContext` — pick one

### Server state
- Currently none. If a backend is introduced later, fetch data in a dedicated hook (e.g. `useProducts`) — do **not** call `fetch`/`axios` inline in components

## Routing

- Routing is configured in `src/App.js` via `react-router-dom` v6 (`BrowserRouter`, `Routes`, `Route`)
- Add new routes by extending the existing `<Routes>` block in `App.js` — do not nest a second `BrowserRouter`
- Use the `<Link>` / `useNavigate` API from `react-router-dom` — avoid raw `<a href>` for in-app navigation
- The Paydeet plugin redirects to `/success` and `/cancel` — those routes must always remain mounted

## UI / Styling

- Use **React Bootstrap** components (`Button`, `Modal`, `Navbar`, `Card`, `Row`, `Col`, `Form`) for new UI
- Bootstrap 5 utility classes (`p-3`, `my-2`, `mx-2`, `g-4`, etc.) are allowed in `className`
- Custom styles live in `src/App.css` (component-specific) or `src/index.css` (global resets)
- Do not introduce a second UI kit (MUI, Chakra, Tailwind, Ant Design, etc.)
- Currency is always rendered via `formatCurrency(amount, "NGN")` from `src/lib/utils.js`

## Paydeet Plugin

- The plugin is imported via `import PaydeetPlugin from "@devheit/paydeet-pay-by-app-plugin"`
- It is invoked from `src/components/Navbar.js` — keep checkout invocation centralised. Do not call `PaydeetPlugin.checkout(...)` from multiple components
- Required params: `{ amount: number, apiKey: string, currency: "NGN", businessId: string }`
- `amount` **must** come from `cart.getTotalCost()` — never hard-code
- `businessId` **must** be unique per attempt; use the existing `BIZ-<rand>-<timestamp>` pattern
- Guard against zero-amount checkouts — if `amount <= 0`, do not call `checkout`

## Accessibility

- Interactive elements must use semantic HTML (`<button>`, `<a>`, `<input>`) — avoid clickable `<div>`/`<span>`
- All buttons must have visible text or an `aria-label`
- Form inputs must be paired with a `<label>` (React Bootstrap `<Form.Label>` is acceptable)
- Modal close affordances must be keyboard-accessible (React Bootstrap `<Modal>` handles this by default; do not override `onHide` to a no-op)

## E2E Testing Integration

- Add `data-testid` attributes to all interactive elements (buttons, inputs, modals, list items)
- Naming convention: `data-testid="[area]-[entity]-[action]"`, e.g. `data-testid="cart-open-btn"`, `data-testid="product-coffee-add-btn"`, `data-testid="cart-purchase-btn"`
- When ARIA already uniquely identifies an element, ARIA takes priority over `data-testid` for selectors

## Code Style

- PascalCase for component filenames and React component identifiers
- camelCase for function names, variables, and non-component file names (`productsStore.js`, `utils.js`)
- Prefer `const` over `let`; never use `var`
- Use arrow functions for component-local handlers; named `function` declarations are also acceptable at module top level
- Import order: React/third-party packages → local components/contexts → utilities → styles

## Performance

- Memoise expensive list rendering or derived state with `useMemo`/`useCallback` only when profiling shows a benefit — avoid premature memoisation
- Lazy-load heavy routes with `React.lazy` + `<Suspense>` if a new route adds significant bundle weight
- Do not import the entire Bootstrap JS bundle — `react-bootstrap` components already encapsulate the behaviour they need

## Testing

- Test files: `*.test.js`, co-located or in `src/__tests__/`
- Use `@testing-library/react` — query by role/label/text first, fall back to `getByTestId`
- Use `@testing-library/user-event` (v13 API in this repo) for interactions — not raw `fireEvent` for user-driven flows
- Mock `@devheit/paydeet-pay-by-app-plugin` in tests — do **not** trigger real plugin navigation
- Test rendered output and user-observable behaviour — not implementation internals
