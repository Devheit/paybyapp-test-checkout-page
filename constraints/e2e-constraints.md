# E2E Constraints: paybyapp-test-checkout-page

These constraints govern all end-to-end browser test development for the `paybyapp-test-checkout-page` project.

---

## Page Object Model (POM) — Mandatory

- **All page interactions must go through Page Objects** — zero raw selectors in test files
- Every page or major UI surface gets its own Page Object class inheriting from `BasePage`
- Page Objects expose semantic methods (`addProductToCart('Coffee')`, `openCart()`, `clickPurchase()`) — not raw `click('[data-testid=...]')`
- Page Objects live in `e2e/pages/` — one file per page or major UI surface

### BasePage Contract
```javascript
class BasePage {
  constructor(page) { this.page = page; }
  async navigate(path) { /* ... */ }
  async waitForPageLoad() { /* ... */ }
  async screenshot(name) { /* ... */ }
  async getText(selector) { /* ... */ }
  async click(selector) { /* ... */ }
  async type(selector, text) { /* ... */ }
  async isVisible(selector) { /* ... */ }
}
```

## Selector Strategy

Priority order (use highest available):

1. **ARIA / role selectors** — `[role="button"][aria-label="Add to cart"]`
2. **`data-testid` attributes** — `[data-testid="cart-purchase-btn"]`
3. **Semantic HTML** — `button[type="submit"]`, `input[type="text"]`
4. **Avoid**: CSS class names (Bootstrap classes are shared across components), auto-generated IDs, DOM-structure-dependent selectors

## Wait Strategies — No `waitForTimeout`

- **Never** use `waitForTimeout` / `page.waitForTimeout` — they produce flaky tests
- Use these instead:
  - `waitForSelector(selector)` — element present in DOM
  - `waitForNavigation()` — full page navigation completes (use when navigating to `/success` or `/cancel`)
  - `waitForFunction(fn)` — arbitrary JS condition is true
  - `waitForNetworkIdle()` — all network requests settle (use sparingly)

## Test Isolation

- Each test suite (`describe` block) starts from a clean cart by navigating to `/` in a fresh browser context
- Do **not** share cart state across tests; React Context is in-memory and cleared on full reload
- Tests within a suite may share setup, but **one test must never depend on a previous test's side effects**

## Paydeet Plugin Handling

- The Paydeet checkout opens an external/embedded flow that is **out of scope** for our E2E coverage
- Tests must stop at one of:
  - **Verifying the checkout invocation** — assert the modal "Purchase items!" button is clicked and the plugin is triggered (mock the plugin via Puppeteer's `page.evaluateOnNewDocument` to replace `PaydeetPlugin.checkout` with a stub that records the call)
  - **Verifying the return path** — directly navigate the browser to `/success` or `/cancel` and assert the page renders correctly
- **Never** drive the real Paydeet UI from E2E — credentials, OTPs, and external pages are unreliable test surface

## Failure Handling

- **Screenshot on every failure** — use an `afterEach` hook or `try/catch` per step
- Screenshot naming: `test-results/screenshots/{suite}-{test-name}-failure.png`
- Descriptive test names: `it('adds two coffees to the cart and shows the correct total')` — reads like a user story

## Reporting

- **HTML report**: `test-results/report.html` — generated after every run via `jest-html-reporter`
- **JUnit XML**: `test-results/junit.xml` — for CI integration via `jest-junit`
- Both reporters configured in the Jest config for the e2e folder

## App Configuration for E2E

- **Dev server URL**: `http://localhost:3000` (Create React App default)
- Start the app before E2E runs: `npm start &` then `npx wait-on http://localhost:3000`
- For CI, run `npm run build` then serve `build/` with `npx serve -s build -l 3000`

## Full Pipeline

```bash
# 1. Start the app
npm start &

# 2. Wait for it to be ready
npx wait-on http://localhost:3000

# 3. Run tests
cd e2e && npx jest --config jest.config.js

# 4. Results:
#    test-results/report.html
#    test-results/junit.xml
#    test-results/screenshots/ (on failure)

# 5. Kill the dev server
kill %1
```

## Quick Run (app already running on port 3000)

```bash
cd e2e && npx jest --config jest.config.js
```

## Single Suite

```bash
cd e2e && npx jest --config jest.config.js -- tests/cart.spec.js
```

## Test Domain Coverage Priority

Cover these user flows in order of business value:

1. **Storefront** — product grid renders all three products with names and prices in NGN
2. **Add to cart** — adding a product updates the cart count in the navbar; "+"/"-" controls adjust quantity
3. **Cart modal** — opening shows correct items and total in NGN; "Remove from cart" empties the row
4. **Checkout trigger** — clicking "Purchase items!" invokes the (mocked) Paydeet plugin with the correct `{ amount, currency, businessId }` shape
5. **Result pages** — `/success` and `/cancel` render their respective content when navigated to directly

## Quality Standards

- POM enforced — zero raw selectors in test files
- No `waitForTimeout` anywhere in the test codebase
- Screenshot on every failure
- HTML + JUnit reports generated on every run
- Clean isolation — fresh browser context per test or per `describe`
- Headless mode must work (for CI)
- Docker-compatible (Debian + Chrome dependencies)
