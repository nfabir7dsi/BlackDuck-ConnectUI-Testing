# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Cypress E2E test suite for BlackDuck Connect UI. Uses Cypress 15.4.0 with JavaScript (ES6 modules) and Percy for visual regression testing.

## Commands

```bash
npm run cypress              # Run all tests headless
npm run cypress:headed       # Run tests in browser UI
npm run cypress:open         # Open Cypress interactive test runner
npm run cypress:percy        # Run tests with Percy visual testing
npm run cypress:percy:headed # Percy tests in headed mode
```

## Architecture

Uses a **two-layer Page Object Model (POM)**:

- **Objects** (`cypress/support/objects/`) — Selector-only classes with getter methods. Store CSS selectors, data-testid values, etc. Exported as singleton instances.
- **Pages** (`cypress/support/pages/`) — Interaction classes that import objects for locators and expose action/assertion methods. Use method chaining (`return this`). When navigating to a different page, return that page's instance instead. Exported as singleton instances.

Both layers are organized by feature: Login, Users, Projects, Dashboard, Sidebar, Navbar, Common.

### Custom Commands (`cypress/support/commands.js`)

- `cy.getByDataTestId(id)` — Select by `data-testid` attribute
- `cy.login(username, password)` — Perform login via the login page

### Test Data

Test fixtures live in `cypress/fixtures/`. The primary fixture `coverity.json` contains `baseURL` and credential sets. Tests load fixtures in `beforeEach`:

```javascript
cy.fixture('coverity').then((data) => {
    cy.visit(data.baseURL);
    cy.login(data.validUser.username, data.validUser.password);
});
```

### Selector Strategy

Primary: `data-testid` attributes via `cy.getByDataTestId()`. Secondary: CSS selectors (`input[name="..."]`, `button[type="..."]`).

## Conventions

- Tests go in `cypress/e2e/Test Suites/<Feature>/` with `.cy.js` extension
- When adding a new page: create both an object file (selectors) and a page file (interactions)
- Page methods return `this` for chaining, or return a different page instance on navigation
- Object and page classes are exported as singleton instances (not classes)
- Uncaught exceptions from the app are handled in test setup to prevent false failures
