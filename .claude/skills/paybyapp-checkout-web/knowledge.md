# paybyapp-checkout-web Knowledge Bank

This knowledge bank stores learned patterns, best practices, and solutions discovered during task execution. It is automatically updated by the skill when significant learnings are identified.

---

## Learned Patterns & Best Practices

*Successful patterns and approaches that should be reused in future tasks.*

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

*Problems encountered and their solutions to avoid repeating mistakes.*

### Example Entry Format:
```
[AUTO-LEARNED] YYYY-MM-DD | Guard PaydeetPlugin.checkout against zero-amount totals | High Impact | Prevents triggering the plugin for empty carts | Task: TASK-456
```

---

## Performance Optimisations

*Performance improvements and optimisation techniques discovered.*

### Example Entry Format:
```
[AUTO-LEARNED] YYYY-MM-DD | Use React.lazy for /success and /cancel routes | Medium Impact | Reduces initial bundle size since these screens are only seen post-checkout | Task: TASK-789
```

---

## Security Learnings

*Security best practices and vulnerability prevention techniques.*

### Example Entry Format:
```
[AUTO-LEARNED] YYYY-MM-DD | Move Paydeet apiKey to REACT_APP_PAYDEET_API_KEY env var | High Impact | Avoids hard-coding any live key in source | Task: TASK-321
```

---

## Integration Patterns

*Patterns for integrating with CartContext, React Router v6, React Bootstrap, and the Paydeet plugin.*

### Example Entry Format:
```
[AUTO-LEARNED] YYYY-MM-DD | Generate businessId once per checkout attempt, not per re-render | Medium Impact | Avoids duplicate transaction identifiers if the user re-clicks | Task: TASK-654
```

---

## Testing Strategies

*Effective Testing Library + Jest approaches.*

### Example Entry Format:
```
[AUTO-LEARNED] YYYY-MM-DD | Wrap CartContext consumer tests in a real CartProvider, not a manual mock | Low Impact | Catches regressions in provider helpers | Task: TASK-987
```

---

## Architecture Decisions

*Significant React SPA architectural choices and their rationale.*

### Example Entry Format:
```
[AUTO-LEARNED] YYYY-MM-DD | Keep PaydeetPlugin invocation in Navbar.js only | Medium Impact | Centralises checkout-trigger logic; easier to audit and mock | Task: TASK-147
```

---

## Tooling & Development

*CRA / npm / ESLint workflow improvements.*

### Example Entry Format:
```
[AUTO-LEARNED] YYYY-MM-DD | Use --watchAll=false in CI to make npm test exit cleanly | Low Impact | Avoids hung CI builds | Task: TASK-258
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
