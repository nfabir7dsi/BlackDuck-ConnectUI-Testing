import dashboardObject from "../../objects/DashboardObjects/dashboardObject";

class DashboardPage {
    verifyDashboardPageHeader(text) {
        cy.get(dashboardObject.getDashboardHeader()).should('have.text', text);
        return this;
    }
}

export default new DashboardPage();