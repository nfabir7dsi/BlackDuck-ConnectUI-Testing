import createUserObject from "../../objects/UsersObjects/createUserObject";
import commonPage from "../CommonPage/commonPage";

class CreateUserPage {
    verifyCreateUserPageHeader(text) {
        cy.getByDataTestId(createUserObject.getCreateUserPageHeader()).should('have.text', text);
        return this;
    }

    enterUsername(username) {
        cy.getByDataTestId(createUserObject.getUsernameInput()).type(username);
        return this;
    }
    enterFirstName(firstName) {
        cy.getByDataTestId(createUserObject.getFirstNameInput()).type(firstName);
        return this;
    }
    enterLastName(lastName) {
        cy.getByDataTestId(createUserObject.getLastNameInput()).type(lastName);
        return this;
    }
    enterEmail(email) {
        cy.getByDataTestId(createUserObject.getEmailInput()).type(email);
        return this;
    }
    enterPassword(password) {
        cy.getByDataTestId(createUserObject.getPasswordInput()).type(password);
        return this;
    }
    enterConfirmPassword(confirmPassword) {
        cy.getByDataTestId(createUserObject.getConfirmPasswordInput()).type(confirmPassword);
        return this;
    }

    clickCreateUserButton(isSuccess) {
        cy.getByDataTestId(createUserObject.getCreateUserButton()).click();
        if (isSuccess) {
            return commonPage;
        }
        else {
            return this;
        }
    }

    verifyUsernameFieldError(text) {
        cy.wait(2000);
        cy.get(createUserObject.getUsernameFieldError()).should('contain.text', text);
        return this;
    }

    verifyPasswordFieldError(text) {
        cy.wait(2000);
        cy.get(createUserObject.getPasswordFieldError()).should('contain.text', text);
        return this;
    }

    verifyPasswordMismatchError(text) {
        cy.wait(2000);
        cy.get(createUserObject.getPasswordMismatchError()).should('contain.text', text);
        return this;
    }

}

export default new CreateUserPage();