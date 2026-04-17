import sidebar from '../../../support/pages/Sidebar/sidebar';
import projectPage from '../../../support/pages/ProjectPage/projectPage';
import projectFilterPage from '../../../support/pages/ProjectPage/projectFilterPage';
import loginObjects from '../../../support/objects/LoginObjects/loginObjects';

describe('Project Filter Test Suite', { testIsolation: false }, () => {
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

    // ─── Filter panel visibility ───────────────────────────────────────────────

    it('Verify Add filters button is visible on the Projects page', () => {
        projectFilterPage.verifyAddFiltersButtonVisible();
    });

    it('Verify filter dropdown lists Project, Description, and Last Commit options', () => {
        projectFilterPage
            .openFilters()
            .verifyAllFilterOptionsPresent()
            .dismissFilterPanel();                                      // Dismiss the open dropdown without applying a filter
    });

    // ─── Project (text) filter ─────────────────────────────────────────────────

    it('Verify Project filter narrows the table to matching projects only', () => {
        projectFilterPage
            .applyProjectFilter('AUTOSAR')
            .verifyFilterChipVisible('Project');
        projectPage.verifyRecordCount('1-1');
    });

    it('Verify Project filter chip displays the applied filter value', () => {
        // Filter from the previous test is still active (testIsolation: false)
        projectFilterPage.verifyFilterChipText('Project = AUTOSAR');
    });

    it('Verify removing the Project filter chip restores the full project list', () => {
        projectFilterPage
            .removeFilter('Project')
            .verifyNoActiveFilters();
        projectPage.verifyRecordCount(data.project.count);
    });

    // ─── Description (text) filter ────────────────────────────────────────────

    it('Verify Description filter narrows the table to projects with a matching description', () => {
        projectFilterPage
            .applyDescriptionFilter('AUTOSAR testing')
            .verifyFilterChipVisible('Description')
            .verifyFilterChipText('Description = AUTOSAR testing');
        projectPage.verifyRecordCount('1-1');
    });

    it('Verify Clear filters button removes the Description filter and restores the full list', () => {
        projectFilterPage
            .verifyClearFiltersVisible()
            .clearAllFilters()
            .verifyNoActiveFilters();
        projectPage.verifyRecordCount(data.project.count);
    });

    // ─── Last Commit (date) filter ────────────────────────────────────────────

    it('Verify Last Commit filter panel exposes all six date-mode options', () => {
        projectFilterPage
            .openLastCommitFilter()
            .verifyLastCommitDateOptionsVisible()
            .dismissFilterPanel()                                                   // Dismiss without applying a filter
            .clearAllFilters();
            // .verifyNoActiveFilters();
    });

    it('Verify Last Commit "In the last N days" filter can be applied and shows a chip', () => {
        projectFilterPage
            .applyLastCommitInLastFilter(200, 'days')
            .dismissFilterPanel()
            .verifyFilterChipVisible('Last Commit')
            .verifyFilterChipText('Last Commit = In the last 200 days')
            .clearAllFilters();
    });

    it('Verify Last Commit "In the last N weeks" filter can be applied and shows a chip', () => {
        projectFilterPage
            .applyLastCommitInLastFilter(30, 'weeks')
            .dismissFilterPanel()
            .verifyFilterChipVisible('Last Commit')
            .verifyFilterChipText('Last Commit = In the last 30 weeks')
            .clearAllFilters();
    });

    // ─── Multiple simultaneous filters ────────────────────────────────────────

    it('Verify two filters can be active at the same time and both chips are shown', () => {
        projectFilterPage.applyProjectFilter('CERT-C');
        projectFilterPage.applyDescriptionFilter('CERT-C testing');
        projectFilterPage.verifyActiveFilterCount(2);
        projectPage.verifyRecordCount('1-1');
    });

    it('Verify Clear filters removes all active filters and restores the full project list', () => {
        projectFilterPage
            .verifyClearFiltersVisible()
            .clearAllFilters()
            .verifyNoActiveFilters();
        projectPage.verifyRecordCount(data.project.count);
    });

    after(() => {
        cy.logout();
    });
});
