import usersObject from "../../objects/UsersObjects/usersObject";
import commonPage from "../CommonPage/commonPage";
import createUserPage from "./createUserPage";
import editUserPage from "./editUserPage";

class UsersPage {
    verifyUsersPageHeader(text) {
        cy.getByDataTestId(usersObject.getUsersHeader()).should('have.text', text);
        return this;
    }

    clickCreateUserPageButton() {
        cy.getByDataTestId(usersObject.getCreateUserPageButton()).click();
        return createUserPage;
    }

    clickSearchButton() {
        cy.getByDataTestId(usersObject.getSearchButton()).click();
        return this;
    }

    enterSearchInput(username) {
        cy.getByDataTestId(usersObject.getSearchInput()).clear().type(username);
        cy.wait(2000);
        return this;
    }

    clickOnCreatedUser() {
        cy.getByDataTestId(usersObject.getUsernameCell()).find('a').click();
        return editUserPage;
    }

    verifyCreatedUsername(username) {
        cy.getByDataTestId(usersObject.getUsernameCell()).find('a').should('have.text', username);
        return this;
    }
    verifyCreatedUserDomain(domainName) {
        cy.getByDataTestId(usersObject.getDomainCell()).children('div').should('have.text', domainName);
        return this;
    }
    verifyCreatedUserFirstName(firstName) {
        cy.getByDataTestId(usersObject.getFirstNameCell()).children('div').should('have.text', firstName);
        return this;
    }
    verifyCreatedUserLastName(lastName) {
        cy.getByDataTestId(usersObject.getLastNameCell()).children('div').should('have.text', lastName);
        return this;
    }
    verifyCreatedUserGroups(groups) {
        cy.getByDataTestId(usersObject.getGroupsCell()).children('div').should('have.text', groups);
        return this;
    }

    clickDeleteButton() {
        cy.getByDataTestId(usersObject.getDeleteButton()).click();
        return this;
    }

    verifyModalVisibility() {
        cy.get(usersObject.getDeleteModal()).should('be.visible');
        return this;
    }
    clickConfirmDeleteButton() {
        cy.getByDataTestId(usersObject.getDeleteButtonModal()).click();
        return commonPage;
    }
    verifyUserDeletion(text) {
        cy.getByDataTestId(usersObject.getNoResultsText()).should('have.text', text);
    }
}

export default new UsersPage();