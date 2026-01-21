import sidebarObject from "../../objects/SidebarObjects/sidebarObject";
import usersPage from "../UsersPage/usersPage";

class Sidebar {
    verifySidebarVisibility() {
        cy.get(sidebarObject.getSidebarHeader()).should('be.visible');
        return this;
    }

    verifyDashboardHeader(text) {
        cy.get(sidebarObject.getSidebarHeader()).should('have.text', text);
        return this;
    }

    verifyBlackDuckLogo() {
        cy.get(sidebarObject.getBlackDuckLogo()).should('be.visible');
        return this;
    }

    clickOnUserManagementMenu() {
        cy.getByDataTestId(sidebarObject.getUserManagementMenu()).click();
        return this;
    }

    clickOnUsersTab() {
        cy.getByDataTestId(sidebarObject.getUsersTab()).click();
        return usersPage;
    }
}

export default new Sidebar();