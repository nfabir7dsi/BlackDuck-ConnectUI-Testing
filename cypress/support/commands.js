// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import loginPage from "./pages/LoginPage/loginPage";

Cypress.Commands.add('getByDataTestId', (dataTestId) => {
    return cy.get(`[data-testid="${dataTestId}"]`);
});

Cypress.Commands.add("login", (username, password) => {
    loginPage.enterUsername(username)
        .enterPassword(password)
        .clickLoginButton();
});

// Waits until the element matching `locator` becomes visible, then proceeds immediately.
// Cypress retries every ~50ms so there is no unnecessary waiting — it unblocks
// as soon as the element appears. The default timeout is intentionally large (60 s)
// to handle slow first-load scenarios; pass { timeout: ms } to override.
Cypress.Commands.add('waitTillVisible', (locator, options = {}) => {
    const timeout = options.timeout ?? 60000;
    return cy.get(locator, { timeout }).should('be.visible');
});

Cypress.Commands.add("logout", () => {
    cy.get('body').then(($body) => {
        if ($body.find('[data-testid="dropdown-menu-trigger"]').length > 0) {
            cy.getByDataTestId('dropdown-menu-trigger').click();
            cy.getByDataTestId('logout').click();
        } else {
            cy.log('User menu trigger not found, possibly already logged out');
        }
    });
});