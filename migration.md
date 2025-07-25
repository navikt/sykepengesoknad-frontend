# Cypress to Playwright Migration Guide

This guide provides comprehensive guidelines for converting Cypress tests to Playwright based on experience translating multiple test files in the sykepengesoknad-frontend project.

## Overview

Playwright offers more modern testing capabilities with better test isolation, improved debugging, and more reliable element interactions compared to Cypress. This migration guide ensures consistent, reliable test translations while maintaining the original test intent.

## 1. Import Structure Changes

### Cypress
```typescript
import 'cypress-real-events'
import { utilities } from '../../support/utilities'
```

### Playwright
```typescript
import { test, expect } from '@playwright/test'
import { utilities } from './utilities'
```

## 2. Test Structure Transformation

### Cypress
```typescript
describe('Test description', () => {
    before(() => { /* setup */ })
    it('test name', function() { /* test */ })
})
```

### Playwright
```typescript
test.describe('Test description', () => {
    test.beforeEach(async ({ page }) => { /* setup */ })
    test('test name', async ({ page }) => { /* test */ })
})
```

**Key Changes:**
- `describe` → `test.describe`
- `it` → `test`
- `before()` → `test.beforeEach()` for better test isolation
- All test functions must be `async` and receive `{ page }` parameter

## 3. Navigation & Setup

### Cypress
```typescript
cy.visit('/path')
cy.clearCookies()
```

### Playwright
```typescript
await page.goto('/path')
await page.context().clearCookies()
```

## 4. Element Selection & Interaction

### Cypress
```typescript
cy.get('.selector').click()
cy.contains('text').click()
cy.get('[data-cy="element"]').type('text')
cy.findByRole('button', { name: 'Submit' }).click()
```

### Playwright
```typescript
await page.locator('.selector').click()
await page.getByText('text').click()
await page.locator('[data-cy="element"]').type('text')
await page.getByRole('button', { name: 'Submit' }).click()
```

**Preferred Playwright Selectors:**
- `page.getByRole()` - Most semantic and accessible
- `page.getByText()` - For text content
- `page.getByLabel()` - For form fields
- `page.locator()` - For CSS selectors when needed

**Important: Use Semantic Selectors for Interactive Elements**
```typescript
// Avoid: Using getByText for buttons
await expect(page.getByText('Ferdig')).toBeVisible()

// Prefer: Using getByRole for buttons
await expect(page.getByRole('button', { name: 'Ferdig' })).toBeVisible()
```
When testing interactive elements like buttons, always prefer `getByRole('button')` over `getByText()` for better accessibility and more reliable selection.

## 5. Assertions

### Cypress
```typescript
cy.get('element').should('be.visible')
cy.get('element').should('have.text', 'text')
cy.get('element').should('have.length', 2)
cy.url().should('include', 'path')
cy.get('element').should('have.css', 'property', 'value')
```

### Playwright
```typescript
await expect(page.locator('element')).toBeVisible()
await expect(page.locator('element')).toHaveText('text')
await expect(page.locator('element')).toHaveCount(2)
await expect(page).toHaveURL(/path/)
await expect(page.locator('element')).toHaveCSS('property', 'value')
```

## 6. Test Isolation Handling

**Critical Difference:**
- **Cypress**: Tests share state across `it` blocks within a `describe`
- **Playwright**: Each test is completely isolated

### Impact on Migration
```typescript
// Cypress - State carries over between tests
it('Step 1', () => { /* navigation to step 1 */ })
it('Step 2', () => { /* continues from step 1 */ })
it('Step 3', () => { /* continues from step 2 */ })

// Playwright - Each test must navigate independently
test('Step 1', async ({ page }) => { /* complete navigation to step 1 */ })
test('Step 2', async ({ page }) => { 
    /* navigate through step 1 first, then step 2 */ 
})
test('Step 3', async ({ page }) => { 
    /* navigate through steps 1, 2, then step 3 */ 
})
```

## 7. Utility Function Adaptation

### Guidelines:
1. Check existing Playwright utilities before creating new ones
2. Create helper functions when Cypress utilities don't have Playwright equivalents
3. Maintain same function signatures but adapt for async/await patterns

### Example Translation:
```typescript
// Cypress utility
export function svarJaHovedsporsmal() {
    cy.get('form').findAllByRole('radio', { name: 'Ja' }).first().click()
}

// Playwright utility
export async function svarJaHovedsporsmal(page: Page) {
    const radioButton = page.locator('form').getByRole('radio', { name: 'Ja' }).first()
    await radioButton.click()
    await expect(radioButton).toBeChecked()
}
```

## 8. Complex Interactions

### Comboboxes
```typescript
// Cypress
cy.get('combobox').type('value')
cy.findByRole('option', { name: 'Option' }).click()

// Playwright
await page.getByRole('combobox').type('value')
await page.getByRole('option', { name: 'Option' }).click()
```

### Radio Groups
```typescript
// Cypress
cy.findByRole('group', { name: 'Question' })
  .findByRole('radio', { name: 'Answer' }).check()

// Playwright
await page.getByRole('group', { name: 'Question' })
  .getByRole('radio', { name: 'Answer' }).check()
```

### Date Pickers
```typescript
// Cypress
cy.get('.navds-date__field-button').click()
cy.get('.rdp-day').contains('15').click()

// Playwright
await page.locator('.navds-date__field-button').click()
await page.locator('.rdp-day').getByText('15').click()
```

## 9. File Naming Convention

### Pattern:
- **From**: `testname.cy.ts` in `cypress/e2e/run-3/`
- **To**: `3_testname.spec.ts` in `playwright/`

### Examples:
- `absolutt_tvang.cy.ts` → `3_absolutt_tvang.spec.ts`
- `julesoknad.cy.ts` → `3_julesoknad.spec.ts`
- `medlemskap.cy.ts` → `3_medlemskap.spec.ts`

## 10. Async/Await Patterns

### Key Rules:
- All Playwright interactions must be awaited
- Use `async/await` throughout instead of Cypress's promise chaining
- Function signatures require `async` and page parameter

```typescript
// Cypress - Promise chaining
cy.get('button').click().then(() => {
    cy.url().should('include', 'next-page')
})

// Playwright - Async/await
await page.getByRole('button').click()
await expect(page).toHaveURL(/next-page/)
```

## 11. Common Pitfalls to Avoid

1. **Forgetting page parameter**: Always pass `page` to utility functions
2. **Missing await**: All Playwright actions and assertions must be awaited
3. **Ignoring test isolation**: Don't assume previous test state exists
4. **Over-relying on CSS selectors**: Prefer semantic selectors when possible
5. **Not handling timing**: Use explicit expectations instead of arbitrary waits

## 12. URL Assertions

### Cypress
```typescript
cy.url().should('include', `${soknad.id}/2`)
cy.url().should('equal', Cypress.config().baseUrl + '/path')
```

### Playwright
```typescript
await expect(page).toHaveURL(new RegExp(`${soknad.id}/2`))
await expect(page).toHaveURL('/path')
```

## 13. Element Collections

### Cypress
```typescript
cy.get('elements').should('have.length', 2)
cy.findAllByRole('combobox').should('have.length', 2).last()
```

### Playwright
```typescript
await expect(page.locator('elements')).toHaveCount(2)
await page.getByRole('combobox').last() // Count is implicit
```

## 14. Text Content Verification

### Cypress
```typescript
cy.contains('specific text')
cy.get('element').should('contain', 'text')
```

### Playwright
```typescript
await expect(page.getByText('specific text')).toBeVisible()
await expect(page.locator('element')).toContainText('text')
```

## 15. Modal and Dynamic Content

### Cypress
```typescript
cy.get('body').should('have.css', 'overflow', 'hidden') // Modal active
cy.get('.navds-skeleton').should('have.length', 0) // Loading complete
```

### Playwright
```typescript
await expect(page.locator('body')).toHaveCSS('overflow', 'hidden')
await expect(page.locator('.navds-skeleton')).toHaveCount(0)
```

## Migration Checklist

### Before Starting:
- [ ] Review existing Playwright utilities
- [ ] Understand the test flow and dependencies
- [ ] Identify complex interactions that need special handling

### During Migration:
- [ ] Update imports and test structure
- [ ] Convert all element selectors to Playwright equivalents
- [ ] Add proper async/await patterns
- [ ] Handle test isolation by repeating navigation steps
- [ ] Update assertions to Playwright format
- [ ] Test utility function compatibility

### After Migration:
- [ ] Verify all test functionality is preserved
- [ ] Check that tests run independently
- [ ] Ensure proper error handling
- [ ] Validate semantic selectors are used where possible

## Success Factors

1. **Understand test flow**: Map out the complete user journey before starting
2. **Maintain functionality**: Ensure all original test behaviors are preserved
3. **Use semantic selectors**: Prefer accessibility-focused selectors
4. **Handle isolation**: Account for Playwright's test isolation vs Cypress's state sharing
5. **Leverage existing utilities**: Reuse translated utility functions when available
6. **Test incrementally**: Run tests frequently during migration to catch issues early

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright vs Cypress](https://playwright.dev/docs/why-playwright)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)

---

This guide ensures consistent, reliable test translations that maintain the original test intent while leveraging Playwright's modern testing capabilities.
