# Plan: Modern Storefront Revamp (Yellow #ffaa00 Accent)

## Summary

Lift the demo storefront from a sparse 3-product Bootstrap-default look to a polished, modern ecommerce feel built around the `#ffaa00` yellow accent (no gradients). Expand the catalogue to ~9 products across 3 categories with images, add a hero + featured strip on Store, refresh Success/Cancel, and add a site footer. The Paydeet checkout invocation in `Navbar.js` must remain bit-for-bit identical (`amount`, `apiKey`, `currency: "NGN"`, `businessId`), since this is the demo we need to ship.

## Design Tokens

A flat (no-gradient) palette built around `#ffaa00`:

| Token | Value | Use |
|---|---|---|
| `--accent` | `#ffaa00` | Primary CTAs, active states, focus ring, brand mark |
| `--accent-hover` | `#e69900` | Hover/active for accent buttons |
| `--accent-soft` | `#ffd980` | Badges, subtle highlights, hover backgrounds |
| `--accent-cream` | `#fff6e0` | Hero background, featured-strip background |
| `--ink` | `#1a1a1a` | Primary text, dark surfaces (footer) |
| `--ink-muted` | `#6b6b6b` | Secondary text, captions |
| `--surface` | `#ffffff` | Cards, modal, default page background |
| `--border` | `#ececec` | Card borders, dividers |
| `--danger` | `#c62828` | Remove buttons |

Bootstrap CSS variable overrides applied globally so `<Button variant="primary">` and friends pick up the yellow automatically (`--bs-primary`, `--bs-primary-rgb`, `--bs-link-color`, `--bs-focus-ring-color`).

Typography: pull **Inter** from Google Fonts via `<link>` in `public/index.html` (no `@import` FOUC). Keep the existing system-font fallback chain after Inter. Headings use weight 600, body 400.

## Catalogue Expansion (categories + featured flag)

`productsStore.js` grows from 3 → 9 items, all with `{ id, title, price, image, category, description, featured? }`. Existing IDs/titles/prices are retained so the cart and checkout amounts remain comparable in the demo.

| Category | Items |
|---|---|
| **Lifestyle** | Coffee (existing), Scented Candle, Ceramic Mug |
| **Accessories** | Sunglasses (existing), Leather Backpack, Wristwatch |
| **Electronics** | Camera (existing), Headphones, Smart Speaker |

Featured (`featured: true`): Camera, Leather Backpack, Coffee — one per category, ensures the strip shows variety.

Images: deterministic `picsum.photos` URLs with per-product seeds, e.g. `https://picsum.photos/seed/paybyapp-coffee/600/400`. Seeds keep images stable across reloads. (User selected the Unsplash/picsum option; picsum is simpler and needs no API key.)

New helpers exported from `productsStore.js`:
- `getFeaturedProducts()` → products with `featured: true`
- `getProductsByCategory(category)` → filtered array
- `productCategories` → array of category names for filter chips

## Affected Files

- [ ] `src/App.js` — wrap routes in a layout that includes the new `<Footer />`; no routing changes
- [ ] `src/CartContext.js` — **no shape changes**; cart shape stays `items / getProductQuantity / addOneToCart / removeOneFromCart / deleteFromCart / getTotalCost` (constraint locked)
- [ ] `src/productsStore.js` — add `image`, `category`, `description`, `featured` fields; expand to 9 products; add `productCategories`, `getFeaturedProducts`, `getProductsByCategory`
- [ ] `src/components/Navbar.js` — restyle navbar (brand mark + cart pill); restyle modal (image thumbs, line items, total panel, yellow Purchase CTA); add `data-testid`s; **`initialize()` and `PaydeetPlugin.checkout({...})` body unchanged**
- [ ] `src/components/ProductCard.js` — image at top, category badge, title, price, quantity controls; modern card with subtle shadow + accent border on hover
- [ ] `src/components/CartProduct.js` — image thumbnail, title, qty stepper, line subtotal, remove button
- [ ] `src/components/Hero.js` *(new)* — cream-background hero section with headline, sub-copy, yellow "Shop now" CTA anchoring to `#products`
- [ ] `src/components/FeaturedStrip.js` *(new)* — horizontal row of featured products on cream background
- [ ] `src/components/Footer.js` *(new)* — dark (`--ink`) footer with brand, fake nav links (About, Contact, Terms), copyright, yellow brand accent
- [ ] `src/components/CategoryFilter.js` *(new)* — chip-style filter (All + 3 categories) using accent for the active chip
- [ ] `src/pages/Store.js` — compose `<Hero />` + `<FeaturedStrip />` + `<CategoryFilter />` + grouped/filtered product grid (with `id="products"` anchor)
- [ ] `src/pages/Success.js` — checkmark icon, headline, sub-copy, "Continue shopping" `<Link to="/">` CTA
- [ ] `src/pages/Cancel.js` — refresh layout; **fix copy that incorrectly references "Stripe" — replace with neutral wording** (e.g., "Your payment was cancelled")
- [ ] `src/index.css` — Bootstrap CSS-variable overrides, Inter family declaration, body color/bg, link & focus styling
- [ ] `src/App.css` — component-specific styles (hero, featured strip, footer, product card hover, cart modal polish, navbar styling, category chips)
- [ ] `public/index.html` — `<link rel="preconnect" ...>` + Inter Google Fonts link, update `<title>` from "React App" to "Pay by App Store"
- [ ] `src/App.test.js` — *not in scope* (already stale "renders learn react link" assertion — separate cleanup)

## Execution Order

Strict order to honour dependency rules (data → context → components → pages → app shell → polish):

1. **Branch + scaffolding**
   1. Create branch `feat/storefront-modern-revamp` off `development`
   2. Add `runtime/specs/PLAN-storefront-modern-revamp.md` (this file)
2. **Tokens & globals**
   3. `public/index.html` — Inter font, title
   4. `src/index.css` — palette tokens, Bootstrap overrides, body/typography
3. **Data layer**
   5. `src/productsStore.js` — expand catalogue, add helpers (no consumer touches yet)
4. **Leaf components**
   6. `src/components/ProductCard.js` — image + category badge + new controls
   7. `src/components/CartProduct.js` — thumbnail + line layout
   8. `src/components/Hero.js` *(new)*
   9. `src/components/FeaturedStrip.js` *(new)*
   10. `src/components/CategoryFilter.js` *(new)*
   11. `src/components/Footer.js` *(new)*
5. **Containers**
   12. `src/components/Navbar.js` — restyle only; checkout invocation untouched
   13. `src/pages/Store.js` — compose hero / featured / filter / grid
   14. `src/pages/Success.js` & `src/pages/Cancel.js` — refreshed pages
6. **App shell**
   15. `src/App.js` — mount `<Footer />` outside `<Routes>` but inside `<BrowserRouter>` so it persists across all routes
   16. `src/App.css` — component styles (can be filled in as components land; final pass here)
7. **Verification**
   17. `npm test -- --watchAll=false` — must pass (existing failing `App.test.js` flagged, not blocking unless user wants it addressed)
   18. `npm run build` — must succeed with no new warnings
   19. Manual smoke: hero → add multiple products → open cart → verify total → click Purchase and confirm the Paydeet plugin is invoked with the same shape as before

Items 6–11 inside step 4 can be implemented in any order — they are independent leaf components and could be parallelised within a single `paybyapp-checkout-web` session.

## Paydeet Plugin Notes

**Zero behavioural changes to the checkout integration.** The `initialize()` function in `Navbar.js` must continue to call:

```js
await PaydeetPlugin.checkout({
  amount: cart.getTotalCost(),
  apiKey: "123456789ab",
  currency: "NGN",
  businessId: `BIZ-${Math.random().toString(36).substring(2, 15)}-${Date.now()}`,
});
```

- Same demo `apiKey` (no env-var work in this task — `project-state.md` open question remains untouched)
- Same `businessId` random pattern
- Same `amount` source (`cart.getTotalCost()`)
- Same `currency: "NGN"`
- Purchase CTA in the restyled modal must call the **same** `initialize` handler — only the button's `variant`/`className` change
- Existing guard requirement from `general-constraints.md` (`amount > 0` before invoking) — add an explicit early return if `cart.getTotalCost() <= 0` to be safe; the empty-cart branch already hides the button, so this is belt-and-braces

## `data-testid` Requirements (so future E2E can target the new UI)

| Element | testid |
|---|---|
| Hero "Shop now" CTA | `hero-shop-btn` |
| Featured strip product card | `featured-product-{id}` |
| Category filter chip | `category-chip-{name}` (e.g., `category-chip-all`) |
| Product card (root) | `product-card-{id}` |
| Product add-to-cart button | `product-{id}-add-btn` |
| Product remove-from-cart button | `product-{id}-remove-btn` |
| Product +/- buttons | `product-{id}-inc-btn`, `product-{id}-dec-btn` |
| Cart open button | `cart-open-btn` *(preserve)* |
| Cart modal root | `cart-modal` |
| Cart line remove | `cart-remove-{id}` |
| Cart total amount | `cart-total` |
| Purchase items button | `cart-purchase-btn` *(preserve)* |
| Footer (root) | `site-footer` |

These must be added during the web implementation, not later.

## Sub-task Specs

### Web Spec 1 — Tokens, globals, and font

**Files**: `public/index.html`, `src/index.css`

**Acceptance**:
- Inter font loads (verify in DevTools Network) and is the rendered family on `<body>`
- `<title>` reads "Pay by App Store"
- `:root` exposes the design-token CSS variables defined above
- Bootstrap `--bs-primary` overridden to `#ffaa00`; `<Button variant="primary">` renders yellow without any per-button styling
- Body background is `#ffffff`, body text is `var(--ink)`
- Focus rings use `var(--accent)` at ~30% opacity (use `rgb(...)` not gradient)

### Web Spec 2 — productsStore expansion

**File**: `src/productsStore.js`

**Acceptance**:
- 9 products total; the 3 original IDs and prices are preserved
- Each product has `{ id, title, price, image, category, description, featured? }`
- Exports `productsArray`, `getProductData`, `productCategories` (array of 3 strings), `getFeaturedProducts()`, `getProductsByCategory(category)`
- `productCategories` returns the 3 string category names in display order
- `getFeaturedProducts()` returns exactly the 3 products flagged `featured: true`
- No consumer code touched in this sub-task

### Web Spec 3 — Leaf component restyles + new components

**Files**: `ProductCard.js`, `CartProduct.js`, new `Hero.js`, `FeaturedStrip.js`, `CategoryFilter.js`, `Footer.js`

**Acceptance**:
- `ProductCard` renders product image (16:10 ratio, `object-fit: cover`), category badge (yellow soft pill), title, price, and quantity controls. Card has white background, `1px solid var(--border)`, and a subtle non-gradient shadow that intensifies + border becomes `var(--accent)` on hover
- `CartProduct` lays out as: thumbnail (left) + title/quantity/line subtotal (middle) + remove button (right). Uses `formatCurrency(..., "NGN")` for amounts
- `Hero` is a full-width section with `var(--accent-cream)` background, large headline, supporting copy, and a yellow `<Button>` linking to `#products`. No gradient. Includes a single decorative image on the right at md+ widths
- `FeaturedStrip` renders horizontally on md+ and stacks on sm, on `var(--accent-cream)` band, heading "Featured this week"
- `CategoryFilter` renders chip-style buttons; active chip uses `var(--accent)` background + `var(--ink)` text; lifts a parent-controlled `selectedCategory` value (`"all" | <category>`)
- `Footer` has `var(--ink)` background, `#f5f5f5` text, brand name in yellow, three columns of fake nav links + bottom rule + copyright. Anchors are `<a>` with `href="#"` (placeholder).
- All interactive elements have the `data-testid`s listed above and are keyboard-accessible
- No new ESLint warnings

### Web Spec 4 — Navbar + modal restyle (preserve checkout invocation)

**File**: `src/components/Navbar.js`

**Acceptance**:
- Navbar uses a clean white surface with bottom border, brand mark with a small yellow accent (brand text + a yellow underline or dot — no gradient), cart trigger is a pill-shaped button using accent color and showing count badge
- Modal header polished, body shows line items using the new `CartProduct` layout, footer shows total panel + yellow Purchase CTA
- `cart-open-btn` and `cart-purchase-btn` test IDs preserved
- **`initialize()` function body byte-identical** (or strictly equivalent) to current; only an empty-cart guard added: `if (cart.getTotalCost() <= 0) return;`
- Modal still receives `show` / `onHide` from local `useState` — no library change
- No new ESLint warnings

### Web Spec 5 — Pages: Store, Success, Cancel

**Files**: `src/pages/Store.js`, `src/pages/Success.js`, `src/pages/Cancel.js`

**Acceptance**:
- `Store.js` composition order: `<Hero />` → `<FeaturedStrip />` → section heading "All products" with `id="products"` anchor → `<CategoryFilter />` → product grid (1 col xs, 2 col sm, 3 col md, 4 col lg). Selected category state lives in `Store.js` via `useState`
- "All" chip shows every product; selecting a category filters the grid; selection has no impact on Featured strip
- `Success.js` renders a centred card: yellow checkmark glyph (use a Bootstrap Icon font or inline SVG; no extra UI kit), headline "Payment successful", sub-copy, "Continue shopping" `<Link>` styled as the yellow primary button
- `Cancel.js` same layout with a neutral icon and headline "Payment cancelled". **Remove the existing "Stripe" reference.**
- Both pages keep their route paths (`/success`, `/cancel`) — the Paydeet return path must continue to work
- No new ESLint warnings

### Web Spec 6 — App shell + global CSS

**Files**: `src/App.js`, `src/App.css`

**Acceptance**:
- `<Footer />` renders on every route (mounted inside `<BrowserRouter>` but outside `<Routes>`, after `<Routes>`)
- `<Container>` continues to wrap the routed content; the footer sits outside the centred container so it spans full width
- `App.css` contains all component-scoped styles introduced by this task; no leftover stock CRA styles (`.App-logo`, `.App-header`, `App-logo-spin` keyframe) — these are unused after the revamp and can be removed
- `npm run build` succeeds with **no new** warnings
- `npm test -- --watchAll=false` — passes for any test that passed before this task (i.e., does not regress existing passing tests; the stale `App.test.js` failure is documented separately)

### E2E Spec — *deferred*

No E2E work in this task. `data-testid` attributes listed above are required so a future `paybyapp-checkout-e2e` task can write a smoke spec covering: hero CTA → add featured product → open cart → click Purchase → confirm Paydeet plugin invoked. This will be filed as a separate ticket after the revamp ships.

## Acceptance Criteria (Feature-Level)

- [ ] Site looks visibly modern: hero + featured strip + categorised grid + footer
- [ ] `#ffaa00` is the dominant accent (CTAs, brand mark, active filter, focus ring, hover borders)
- [ ] **No CSS gradient declarations anywhere** in the new styles (`grep -ri "gradient" src/` returns nothing in changed files)
- [ ] Cart still opens from the navbar, still uses the modal, and clicking Purchase triggers `PaydeetPlugin.checkout` with the exact same `{ amount, apiKey, currency, businessId }` shape
- [ ] `/success` and `/cancel` routes are still mounted and reachable
- [ ] `npm run build` succeeds with no new warnings on changed files
- [ ] `npm test -- --watchAll=false` does not regress (the pre-existing stale `App.test.js` is flagged, not fixed in this scope)
- [ ] All listed `data-testid`s present on interactive elements
- [ ] Inter font loads and is applied; no FOUC
- [ ] Site renders responsively at 360px, 768px, and 1280px without layout breakage

## Risks & Open Questions

**Risks**
- *Paydeet contract drift* — any incidental edit to `initialize()` could regress the demo. Mitigation: explicit guard in spec, side-by-side diff review.
- *Stock CRA test* — `App.test.js` already fails. If we're strict about "tests pass", we must either delete or update that test. Recommendation: out of scope — flag as a separate cleanup. **Open question for user.**
- *picsum availability* — image service requires network. If demoing offline, fallback assets in `/public/images/` may be needed. Mitigation: add `onError` fallback in `ProductCard` to a local `/public/placeholder.png` if you want belt-and-braces; otherwise accept network requirement.
- *Bootstrap variable override scope* — overriding `--bs-primary` re-tints every `<Button variant="primary">`. Verify the existing `<Button variant="success">` on the Purchase button: we plan to change it to `variant="primary"` (yellow) — confirm that matches the desired CTA color.
- *Cart modal feels small on mobile* — modal could feel cramped; React Bootstrap `<Modal size="lg" centered>` handles this. Not a deviation, just a styling choice noted here.

**Open Questions**
1. **picsum vs local images** — user picked Unsplash/picsum; OK to use `picsum.photos` (deterministic seeds)? If you'd prefer Unsplash Source URLs (more "real product" looking, but less stable), say so before execution.
2. **Stale `App.test.js`** — fix in this PR (1-line update) or leave for a separate cleanup?
3. **Brand name** — keep "Ecommerce Store" (current navbar text) or rename to something like "Paydeet Mart" / "Pay by App Store"? Footer copyright also depends on this.
4. **Footer link content** — "About / Contact / Terms / Privacy" as non-functional placeholders OK?

## Handoff Checklist (post-approval)

1. Get explicit "approved — proceed" from user
2. Create branch: `git checkout -b feat/storefront-modern-revamp`
3. Invoke `paybyapp-checkout-web` with sub-task specs 1 → 6 in order
4. After all sub-tasks land, run `npm test -- --watchAll=false` and `npm run build`
5. Update `project-state.md` to record this revamp under Completed Milestones
6. Hand back to user for review / merge
