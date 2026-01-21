import loginObjects from "../../objects/LoginObjects/loginObjects";
import projectPage from "../ProjectPage/projectPage";

class LoginPage {
    enterUsername(username) {
        cy.get(loginObjects.getUsernameInput()).type(username);
        return this;
    }

    enterPassword(password) {
        cy.get(loginObjects.getPasswordInput()).type(password);
        return this;
    }

    clickLoginButton() {
        cy.get(loginObjects.getLoginButton()).click();
        return this;
    }

    verifyErrorMessage(expectedMessage) {
        cy.getByDataTestId(loginObjects.getErrorMessage()).children('div')
          .should('contain.text', expectedMessage);
        return this;
    }

    verifyInputErrorMessage(inputField, expectedMessage) {
        cy.get(loginObjects.getLabel()).contains(inputField).siblings('p')
            .should('have.text', expectedMessage);
        return this;
    }
}

export default new LoginPage();