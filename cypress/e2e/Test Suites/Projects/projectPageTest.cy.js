import sidebar from "../../../support/pages/Sidebar/sidebar";
import projectPage from "../../../support/pages/ProjectPage/projectPage";
import loginObjects from "../../../support/objects/LoginObjects/loginObjects";

describe("Projects Page Test Suite", { testIsolation: false }, () => {
    let data;

    before(() => {
        cy.fixture('coverity').then((fixture) => {
            data = fixture;
            cy.visit(data.baseURL);
            cy.waitTillVisible(loginObjects.getLoginPageHeader());
            cy.login(data.validUser.username, data.validUser.password);
        });
        sidebar.clickOnProjectsMenu()
            .clickOnProjectsTab()
            .clearFiltersIfPresent(); 
    });

    it("Verify user can navigate to Projects page from the sidebar", () => {
        projectPage.verifyProjectPageHeader('Projects');
    });

    it("Verify Projects table is visible", () => {
        projectPage.verifyTableVisible();
    });

    it("Verify all three table columns are present", () => {
        projectPage
            .verifyProjectColumnVisible()
            .verifyDescriptionColumnVisible()
            .verifyLastCommitColumnVisible();
    });

    it("Verify Projects table contains data", () => {
        projectPage.verifyTableHasRows();
    });

    it("Verify record count is displayed", () => {
        projectPage.verifyRecordCount(data.project.count);
    });

    it("Verify first project row shows correct project name", () => {
        projectPage.verifyFirstRowProjectName(data.project.title);
    });

    it("Verify first project row shows a description", () => {
        projectPage.verifyFirstRowDescription(data.project.description);
    });

    it("Verify Export button is visible", () => {
        projectPage.verifyExportButtonVisible();
    });

    it("Verify search returns matching results", () => {
        projectPage
            .clickSearchButton()
            .enterSearchInput('Defector')
            .verifySearchResult('Defector')
            // .verifyProjectVisible('Defector')
            .clearSearch();
    });

    it("Verify no active filter chips are present when no filters are applied", () => {
        projectPage.verifyNoActiveFilters();
    });

    // it("Verify clear filters button is visible when a filter is applied and removes it when clicked", () => {
    //     projectPage
    //         .applyProjectFilter('AUTOSAR')
    //         .verifyClearFiltersVisible()
    //         .clickClearFilters()
    //         .verifyNoActiveFilters()
    //         .verifyRecordCount('69');
    // });

    it("Verify clicking a project link navigates to the project detail page", () => {
        projectPage
            .clickFirstProjectLink()
            .verifyUrlContains('/ui/projects/');
    });

    after(() => {
        cy.logout();
    });
});
