import loginPage from "../../../support/pages/LoginPage/loginPage";
import dashboardPage from "../../../support/pages/DashboardPage/dashboardPage";

describe('Login Test Suite', () => {

    beforeEach(() => {
        cy.fixture('coverity').then((data) => {
            cy.visit(data.baseURL);
            cy.wait(10000);
        });
    });

    it('Logging in with empty input fields', () => {
        loginPage.clickLoginButton()
            .verifyInputErrorMessage('Username', 'Username is required')
            .verifyInputErrorMessage('Password', 'Password is required');
        // cy.wait(2000);
        // cy.percySnapshot('Login Page with Error for Empty Fields');
    });

    it('Logging in with invalid credentials', () => {
        cy.fixture('coverity').then((data) => {
            loginPage.enterUsername(data.invalidUser.username)
                .enterPassword(data.invalidUser.password)
                .clickLoginButton()
                .verifyErrorMessage('Invalid credentials');
            // cy.wait(2000);
            // cy.percySnapshot('Login Page with Error for Invalid Credentials');
        });
    });

    it('Logging in with valid credentials', () => {
        cy.fixture('coverity').then((data) => {
            loginPage.enterUsername(data.validUser.username)
                .enterPassword(data.validUser.password)
                .clickLoginButton();
            dashboardPage.verifyDashboardPageHeader('Dashboard');
            // cy.wait(2000);
            // cy.percySnapshot('Dashboard Page after Successful Login');
        });
    });
});