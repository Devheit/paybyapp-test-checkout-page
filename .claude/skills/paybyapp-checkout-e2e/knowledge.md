# paybyapp-checkout-e2e Knowledge Bank

This knowledge bank stores learned Puppeteer patterns, selector strategies, wait fixes, and test reliability improvements for the paybyapp-test-checkout-page project.

---

## Learned Patterns & Best Practices

*Successful Puppeteer and POM patterns that should be reused.*

### Example Entry Format:
```
[AUTO-LEARNED] YYYY-MM-DD | Rule Title | Impact Level | Why beneficial | Task: TASK-ID

Context: [when this rule applies]
Pattern: [how to implement it]
Benefits: [why it's valuable]
Example: [code snippet or scenario]
```

---

## Common Pitfalls & Solutions

*Flaky tests, selector failures, and their fixes.*

### Example Entry Format:
```
[AUTO-LEARNED] YYYY-MM-DD | React Bootstrap modal animation requires waitForSelector with visible: true on Modal.Body | High Impact | Prevents flaky reads of cart contents before the modal finishes animating | Task: TASK-456
```

---

## Performance Optimisations

*Test speed improvements and pipeline optimisations.*

### Example Entry Format:
```
[AUTO-LEARNED] YYYY-MM-DD | Reuse a single browser instance per file with a fresh BrowserContext per test | Medium Impact | Cuts suite runtime by ~40% vs. launching a new browser per test | Task: TASK-789
```

---

## Security Learnings

*Security flows that need E2E coverage.*

### Example Entry Format:
```
[AUTO-LEARNED] YYYY-MM-DD | Assert that Paydeet is never invoked when total is zero | High Impact | Catches regressions of the zero-amount guard | Task: TASK-321
```

---

## Integration Patterns

*Patterns for interacting with the React SPA's specific behaviour and the mocked Paydeet plugin.*

### Example Entry Format:
```
[AUTO-LEARNED] YYYY-MM-DD | Inject Paydeet mock via evaluateOnNewDocument before goto so the bundle picks it up at startup | Medium Impact | Avoids race where Navbar evaluates the import before the mock is installed | Task: TASK-654
```

---

## Testing Strategies

*Effective E2E test organisation for the storefront + checkout domain.*

### Example Entry Format:
```
[AUTO-LEARNED] YYYY-MM-DD | One Page Object per route view + one for the Cart Modal | Low Impact | Keeps Page Objects cohesive and maintainable | Task: TASK-987
```

---

## Architecture Decisions

*Significant E2E architecture choices.*

### Example Entry Format:
```
[AUTO-LEARNED] YYYY-MM-DD | Always assert NGN currency in totals to catch accidental currency changes | Medium Impact | Prevents silent regressions if a future change defaults to USD/EUR | Task: TASK-147
```

---

## Tooling & Development

*Puppeteer config, Jest setup, and CI workflow improvements.*

### Example Entry Format:
```
[AUTO-LEARNED] YYYY-MM-DD | Use --no-sandbox in CI Docker images to avoid Chromium sandbox issues | Low Impact | Fixes Chrome crash on startup in containers | Task: TASK-258
```

---

## Learning Statistics

- **Total Learnings**: 0
- **High Impact**: 0
- **Medium Impact**: 0
- **Low Impact**: 0
- **Last Updated**: 2026-06-21

---

*Note: This knowledge bank is continuously updated. Review periodically to ensure learnings remain relevant and accurate.*
