import sidebarObject from "../../objects/SidebarObjects/sidebarObject";
import usersPage from "../UsersPage/usersPage";
import projectPage from "../ProjectPage/projectPage";

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

    clickOnProjectsMenu() {
        cy.getByDataTestId(sidebarObject.getProjectsMenu()).click();
        return this;
    }

    clickOnProjectsTab() {
        cy.getByDataTestId(sidebarObject.getProjectsTab()).click();
        return projectPage;
    }
}

export default new Sidebar();