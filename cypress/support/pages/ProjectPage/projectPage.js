import projectFilterObject from "../../objects/ProjectObjects/projectFilterObject";
import projectObject from "../../objects/ProjectObjects/projectObject";
import issuePage from "../IssuePage/issuePage";

class ProjectPage {
    verifyProjectPageHeader(text) {
        cy.getByDataTestId(projectObject.getProjectHeader()).should('have.text', text);
        return this;
    }

    verifyTableVisible() {
        cy.getByDataTestId(projectObject.getProjectTable()).should('be.visible');
        return this;
    }

    verifyProjectColumnVisible() {
        cy.getByDataTestId(projectObject.getProjectColumnHeader()).should('be.visible');
        return this;
    }

    verifyDescriptionColumnVisible() {
        cy.getByDataTestId(projectObject.getDescriptionColumnHeader()).should('be.visible');
        return this;
    }

    verifyLastCommitColumnVisible() {
        cy.getByDataTestId(projectObject.getLastCommitColumnHeader()).should('be.visible');
        return this;
    }

    verifyTableHasRows() {
        cy.getByDataTestId(projectObject.getTableBody()).find('tr').should('have.length.greaterThan', 0);
        return this;
    }

    verifyRecordCount(expectedText) {
        cy.getByDataTestId(projectObject.getRecordCount()).should('contain.text', expectedText);
        return this;
    }

    verifyFirstRowProjectName(projectName) {
        cy.getByDataTestId(projectObject.getFirstRowProjectCell()).find('a').should('have.text', projectName);
        return this;
    }

    verifyFirstRowDescription(description) {
        cy.getByDataTestId(projectObject.getFirstRowDescriptionCell()).should('contain.text', description);
        return this;
    }

    clickSearchButton() {
        cy.getByDataTestId(projectObject.getSearchButton()).click();
        return this;
    }

    enterSearchInput(searchText) {
        cy.getByDataTestId(projectObject.getSearchInput()).clear().type(searchText);
        cy.wait(1000);
        return this;
    }

    verifySearchResult(searchText) {
        cy.getByDataTestId(projectObject.getSearchResult()).should('contain.text', searchText);
        return this;
    }

    verifyProjectVisible(projectName) {
        cy.getByDataTestId(projectObject.getProjectLinkId(projectName)).should('be.visible');
        return this;
    }

    clickProjectLink(projectName) {
        cy.getByDataTestId(projectObject.getProjectLinkId(projectName)).click();
        return this;
    }

    clickFirstProjectLink() {
        cy.getByDataTestId(projectObject.getFirstRowProjectCell()).find('a').click();
        cy.wait(1000);
        return issuePage;
    }

    verifyExportButtonVisible() {
        cy.getByDataTestId(projectObject.getExportButton()).should('be.visible');
        return this;
    }

    verifyUrlContains(path) {
        cy.url().should('include', path);
        return this;
    }

    clearFiltersIfPresent() {
        cy.waitTillVisible(`[data-testid="${projectFilterObject.getAddFilterButton()}"]`);
        cy.get('body').then(($body) => {
            if ($body.find(`[data-testid="${projectObject.getFiltersSection()}"]`).text().includes(projectObject.getClearFiltersText())) {
                cy.getByDataTestId(projectObject.getFiltersSection())
                    .contains('button', projectObject.getClearFiltersText()).click();
                cy.wait(500);
            }
        });
        cy.log('Cleared filters if they were present');
        return this;
    }

    verifyClearFiltersVisible() {
        cy.getByDataTestId(projectObject.getFiltersSection()).children('div')
            .contains('button', projectObject.getClearFiltersText()).should('be.visible');
        return this;
    }

    clickClearFilters() {
        cy.getByDataTestId(projectObject.getFiltersSection())
            .contains('button', projectObject.getClearFiltersText()).click();
        return this;
    }

    verifyNoActiveFilters() {
        cy.getByDataTestId(projectObject.getFilterTrigger()).should('not.exist');
        return this;
    }

    clearSearch() {
        cy.get('body').then(($body) => {
            if ($body.find(projectObject.getSearchInputSelector()).length > 0) {
                cy.getByDataTestId(projectObject.getSearchInput()).clear();
                cy.wait(500);
            }
        });
        return this;
    }

    
    verifyNavigatedToProjectsListPage() {
        cy.url().should('include', '/ui/projects');
        cy.url().should('not.match', /\/ui\/projects\/.+/);
        return this;
    }

    // applyProjectFilter(projectName) {
    //     cy.getByDataTestId(projectObject.getFiltersSection())
    //         .contains('button', 'Add filters').click();
    //     cy.get(projectObject.getFilterBox()).should('be.visible');
    //     cy.get(projectObject.getFilterElement()).contains('Project').click();
    //     cy.getByDataTestId(projectObject.getFilterContent()).should('be.visible');
    //     cy.getByDataTestId(projectObject.getFilterContent())
    //         .find('input').type(projectName + '{enter}');
    //     cy.wait(500);
    //     return this;
    // }
}

export default new ProjectPage();