import loginPage from "../../../support/pages/LoginPage/loginPage";
import projectPage from "../../../support/pages/ProjectPage/projectPage";

describe('Login Test Suite', () => {
    const url = 'http://10.255.185.193:5173/ui';
    const validUsername = 'admin';
    const validPassword = 'C0ver1ty!';
    const invalidUsername = 'invalidUser';
    const invalidPassword = 'wrongPassword';

    beforeEach(() => {
        cy.visit(url);
    });

    it('Logging in with empty input fields', () => {
        loginPage.clickLoginButton()
            .verifyInputErrorMessage('Username', 'Username is required')
            .verifyInputErrorMessage('Password', 'Password is required');

        cy.wait(2000);
        cy.percySnapshot('Login Page with Error for Empty Fields');
    });

    it('Logging in with invalid credentials', () => {
        loginPage.enterUsername(invalidUsername)
            .enterPassword(invalidPassword)
            .clickLoginButton()
            .verifyErrorMessage('Invalid credentials');

        cy.wait(2000);
        cy.percySnapshot('Login Page with Error for Invalid Credentials');
    });

    it('Logging in with valid credentials', () => {
        loginPage.enterUsername(validUsername)
            .enterPassword(validPassword)
            .clickLoginButton();

        projectPage.verifyProjectPageHeader('Projects');
        cy.wait(2000);
        cy.percySnapshot('Projects Page after Successful Login');
    });
});