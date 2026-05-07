# BlackDuck Connect UI — Cypress E2E Test Suite

End-to-end test automation for the BlackDuck Connect UI, built with [Cypress](https://www.cypress.io/) and the [Page Object Model (POM)](https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions) architecture. Includes visual regression testing via [Percy](https://percy.io/).

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [Architecture](#architecture)
  - [Two-Layer POM](#two-layer-pom)
  - [Custom Commands](#custom-commands)
  - [Test Data & Fixtures](#test-data--fixtures)
- [Features Covered](#features-covered)
- [Selector Strategy](#selector-strategy)
- [Conventions & Patterns](#conventions--patterns)

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| [Cypress](https://www.cypress.io/) | ^15.4.0 | E2E test runner |
| [@percy/cypress](https://docs.percy.io/docs/cypress) | ^3.1.6 | Visual regression testing |
| [@percy/cli](https://docs.percy.io/docs/percy-cli) | ^1.31.4 | Percy CLI integration |
| [dotenv](https://github.com/motdotla/dotenv) | ^17.2.3 | Environment variable management |
| [Playwright](https://playwright.dev/) | ^1.59.1 | Supplemental browser tooling |
| JavaScript (ES6 modules) | — | Test language |

---

## Project Structure

```
BlackDuck-ConnectUI-Testing/
├── cypress/
│   ├── e2e/
│   │   ├── Test Suites/
│   │   │   ├── Issues/
│   │   │   │   ├── Issue Page Filter/
│   │   │   │   │   ├── issueFilterCombinedTest.cy.js      # Combined multi-filter scenarios
│   │   │   │   │   ├── issueFilterDateTest.cy.js           # Date-based filters
│   │   │   │   │   ├── issueFilterEnumTest.cy.js           # Multi-select enum filters
│   │   │   │   │   ├── issueFilterNumericTest.cy.js        # Numeric/range filters
│   │   │   │   │   ├── issueFilterSearchTest.cy.js         # Searchable list filters
│   │   │   │   │   ├── issueFilterSpecialTest.cy.js        # Special/complex filters
│   │   │   │   │   ├── issueFilterTextTest.cy.js           # Wildcard text filters
│   │   │   │   │   └── issueFilterToolbarTest.cy.js        # Toolbar & chip management
│   │   │   │   ├── issueListTableTest.cy.js                # Issue table interactions
│   │   │   │   └── issuePageTest.cy.js                     # Issue page structure & navigation
│   │   │   ├── Login/
│   │   │   │   └── loginTest.cy.js                         # Login validation
│   │   │   ├── Projects/
│   │   │   │   ├── projectFilterTest.cy.js                 # Project list filters
│   │   │   │   └── projectPageTest.cy.js                   # Project page structure
│   │   │   └── User CRUD/
│   │   │       ├── userCreateTest.cy.js                    # User creation validation
│   │   │       └── userCRUDTest.cy.js                      # Full user lifecycle (CRUD)
│   │   └── percyTesting.cy.js                              # Percy visual regression snapshots
│   ├── fixtures/
│   │   ├── coverity.json                                   # Primary test data
│   │   └── example.json
│   └── support/
│       ├── commands.js                                     # Custom Cypress commands
│       ├── e2e.js                                          # Global setup & Percy init
│       ├── objects/                                        # Layer 1: Selector-only classes
│       │   ├── CommonObjects/commonObject.js
│       │   ├── DashboardObjects/dashboardObject.js
│       │   ├── IssueObjects/
│       │   │   ├── issueFilterObject.js
│       │   │   └── issueObject.js
│       │   ├── LoginObjects/loginObjects.js
│       │   ├── NavbarObjects/navbarObject.js
│       │   ├── ProjectObjects/
│       │   │   ├── projectFilterObject.js
│       │   │   └── projectObject.js
│       │   ├── SidebarObjects/sidebarObject.js
│       │   └── UsersObjects/
│       │       ├── createUserObject.js
│       │       ├── editUserObject.js
│       │       └── usersObject.js
│       └── pages/                                          # Layer 2: Interaction classes
│           ├── CommonPage/commonPage.js
│           ├── DashboardPage/dashboardPage.js
│           ├── IssuePage/
│           │   ├── issueFilterPage.js
│           │   └── issuePage.js
│           ├── LoginPage/loginPage.js
│           ├── Navbar/navbar.js
│           ├── ProjectPage/
│           │   ├── projectFilterPage.js
│           │   └── projectPage.js
│           ├── Sidebar/sidebar.js
│           └── UsersPage/
│               ├── createUserPage.js
│               ├── editUserPage.js
│               └── usersPage.js
├── cypress.config.js
├── package.json
└── CLAUDE.md
```

---

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Installation

```bash
git clone <repository-url>
cd BlackDuck-ConnectUI-Testing
npm install
```

### Configuration

Test data is stored in [`cypress/fixtures/coverity.json`](cypress/fixtures/coverity.json):

```json
{
  "baseURL": "http://<host>:<port>/ui/",
  "validUser": { "username": "admin", "password": "..." },
  "invalidUser": { "username": "invalidUser", "password": "..." },
  "newUser": { "username": "test10", "firstName": "Test", ... },
  "project": { "title": "projectName", "count": "NoOfProjects" }
}
```

Update `baseURL` and credentials to match your environment before running tests.

For Percy visual testing, set your `PERCY_TOKEN` environment variable:

```bash
export PERCY_TOKEN=<your-percy-token>
```

---

## Running Tests

```bash
# Run all tests headlessly
npm run cypress

# Run all tests with browser UI visible
npm run cypress:headed

# Open the interactive Cypress test runner
npm run cypress:open

# Run with Percy visual regression
npm run cypress:percy

# Run with Percy in headed mode
npm run cypress:percy:headed

# Run a specific spec file with Percy
npm run cypress:percy:file -- --spec "cypress/e2e/Test Suites/Login/loginTest.cy.js"

# Run a specific spec file with Percy in headed mode
npm run cypress:percy:headed:file -- --spec "cypress/e2e/Test Suites/Login/loginTest.cy.js"
```

Or run with the default commands.

---

## Features Covered

- **Login** — Valid/invalid credential validation and session handling
- **User Management** — Full user lifecycle (create, read, update, delete)
  - User creation with field validation
  - Edit and delete existing users
- **Projects** — Project page structure and list filtering
- **Issues** — Issue page navigation, table interactions, and filtering
  - Filter types: date, numeric, enum (multi-select), text (wildcard), searchable list, special, and combined scenarios
  - Filter toolbar and chip management
- **Visual Regression** — Percy snapshot testing across key pages

---

## Architecture

### Two-Layer POM

This suite uses a strict two-layer separation:

#### Layer 1 — Objects (`cypress/support/objects/`)

Selector-only classes. Each class contains only getter methods that return CSS selectors or `data-testid` values. No Cypress commands are called here.

```javascript
// Example: loginObjects.js
class LoginObjects {
    get usernameInput() { return 'input[name="username"]'; }
    get passwordInput() { return 'input[name="password"]'; }
    get loginButton()   { return 'button[type="submit"]'; }
}
export const loginObjects = new LoginObjects();
```

#### Layer 2 — Pages (`cypress/support/pages/`)

Interaction classes that import the corresponding object for locators and expose action/assertion methods. Methods return `this` for chaining or return a different page instance when navigation occurs.

```javascript
// Example: loginPage.js
import { loginObjects } from '../../objects/LoginObjects/loginObjects';

class LoginPage {
    enterUsername(username) {
        cy.get(loginObjects.usernameInput).type(username);
        return this;
    }
    clickLoginButton() {
        cy.get(loginObjects.loginButton).click();
        return dashboardPage; // returns different page on navigation
    }
}
export const loginPage = new LoginPage();
```

Both layers export singleton instances — never classes.

---

### Custom Commands

Defined in [`cypress/support/commands.js`](cypress/support/commands.js):

| Command | Signature | Description |
|---------|-----------|-------------|
| `getByDataTestId` | `cy.getByDataTestId(id)` | Select element by `data-testid` attribute |
| `login` | `cy.login(username, password)` | Perform full login via the login page |
| `logout` | `cy.logout()` | Logout, with conditional dropdown check |
| `waitTillVisible` | `cy.waitTillVisible(locator, options?)` | Wait up to 60s for element visibility; retries every ~50ms |

---

### Test Data & Fixtures

The primary fixture is [`cypress/fixtures/coverity.json`](cypress/fixtures/coverity.json). Tests load it in `beforeEach`:

```javascript
beforeEach(() => {
    cy.fixture('coverity').then((data) => {
        cy.visit(data.baseURL);
        cy.login(data.validUser.username, data.validUser.password);
    });
});
```

| Key | Description |
|-----|-------------|
| `baseURL` | Application under test URL |
| `validUser` | Credentials for a valid admin user |
| `invalidUser` | Credentials for negative login tests |
| `newUser` | User data for CRUD tests (username, name, email, passwords) |
| `project` | Project details used in project/issue tests |

---

## Conventions & Patterns

### Test Setup

```javascript
// Shared session across tests (no re-login between each)
describe('Issue Page', { testIsolation: false }, () => {
    before(() => {
        cy.fixture('coverity').then((data) => {
            cy.visit(data.baseURL);
            cy.login(data.validUser.username, data.validUser.password);
        });
    });
    after(() => cy.logout());
});
```

### Method Chaining

```javascript
issuePage
    .verifyPageTitle()
    .verifyIssuesTabActive()
    .verifyControlsBarVisible();
```

### Page Navigation Return

```javascript
// Navigating to another page returns that page's instance
sidebar.clickUsersTab();          // returns usersPage
usersPage.clickCreateUserPageButton(); // returns createUserPage
createUserPage.clickCreateUserButton(true); // returns commonPage on success
```

### Exception Handling

- `ResizeObserver loop` errors are caught globally in `e2e.js` to prevent false failures.
- Per-test handlers suppress expected application errors (e.g., API errors during negative tests).

### File & Folder Naming

- Test files: `<feature><Type>Test.cy.js` (e.g., `issueFilterDateTest.cy.js`)
- Object files: `<feature>Object.js` / `<feature>Objects.js`
- Page files: `<feature>Page.js`
- Tests live in `cypress/e2e/Test Suites/<Feature>/`

## Remaining Works

[ ] Some filters may have corner cases that haven't been covered yet.
[ ] Issue page's view dropdown hasn't been tested properly. 
[ ] Bulk triage functionality hasn't been tested.
[ ] AI-assisted triage and AI triage results haven't also been tested.
