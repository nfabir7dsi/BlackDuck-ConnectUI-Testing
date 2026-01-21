import editUserObject from "../../objects/UsersObjects/editUserObject";
import commonPage from "../CommonPage/commonPage";

class EditUserPage {
    verifyEditUserPageHeader(username) {
        cy.getByDataTestId(editUserObject.getEditPageHeader()).should('contain.text', username);
        return this;
    }

    verifyFirstNameInput(firstName) {
        cy.getByDataTestId(editUserObject.getFirstNameInput()).should('have.value', firstName);
        return this;
    }
    editFirstName(newFirstName) {
        cy.getByDataTestId(editUserObject.getFirstNameInput()).clear().type(newFirstName);
        return this;
    }

    clickUpdateUserButton() {
        cy.getByDataTestId(editUserObject.getUpdateUserButton()).click();
        return commonPage;
    }
}

export default new EditUserPage();