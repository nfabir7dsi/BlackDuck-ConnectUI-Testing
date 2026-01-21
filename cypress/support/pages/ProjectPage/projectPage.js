import projectObject from "../../objects/ProjectObjects/projectObject";

class ProjectPage {
    verifyProjectPageHeader(text) {
        cy.get(projectObject.getProjectHeader()).should('have.text', text);
        return this;
    }
}

export default new ProjectPage();