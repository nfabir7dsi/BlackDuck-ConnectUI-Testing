import sidebar from '../../../support/pages/Sidebar/sidebar';
import projectPage from '../../../support/pages/ProjectPage/projectPage';
import projectFilterPage from '../../../support/pages/ProjectPage/projectFilterPage';

/**
 * Project Filter Test Suite
 *
 * Filter options available on the Projects page:
 *
 *  1. Project      – Text input with glob wildcards (* = any word, ? = any char).
 *                    Submitted by pressing Enter. Chip shows "Project = <value>".
 *
 *  2. Description  – Same behaviour as Project filter but matches the
 *                    project description column.
 *
 *  3. Last Commit  – Date-based filter with six radio modes:
 *                      • In the last     → number input + unit (days/weeks/months)
 *                      • Not in the last → same inputs as above
 *                      • In the range    → date range picker (two dates)
 *                      • Exclude         → date range picker
 *                      • After           → single date picker
 *                      • Before          → single date picker
 *                    Chip shows e.g. "Last Commit = In the last 200 days".
 *
 * Active filters appear as removable chips inside the filters-section.
 * Each chip has a dedicated × button (aria-label="Remove <Type> filter").
 * "Clear filters" removes all active filters at once.
 */
describe('Project Filter Test Suite', { testIsolation: false }, () => {
    let data;

    before(() => {
        cy.fixture('coverity').then((fixture) => {
            data = fixture;
            cy.visit(data.baseURL);
            cy.wait(10000);
            cy.login(data.validUser.username, data.validUser.password);
        });
        sidebar.clickOnProjectsMenu()
            .clickOnProjectsTab()
            .clearFiltersIfPresent();
        projectPage.verifyRecordCount('69');                            // Verify we start with the full unfiltered list of projects
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
        projectPage.verifyRecordCount('Display 1-1 of 1');
    });

    it('Verify Project filter chip displays the applied filter value', () => {
        // Filter from the previous test is still active (testIsolation: false)
        projectFilterPage.verifyFilterChipText('Project = AUTOSAR');
    });

    it('Verify removing the Project filter chip restores the full project list', () => {
        projectFilterPage
            .removeFilter('Project')
            .verifyNoActiveFilters();
        projectPage.verifyRecordCount('69');
    });

    // ─── Description (text) filter ────────────────────────────────────────────

    it('Verify Description filter narrows the table to projects with a matching description', () => {
        projectFilterPage
            .applyDescriptionFilter('AUTOSAR testing')
            .verifyFilterChipVisible('Description')
            .verifyFilterChipText('Description = AUTOSAR testing');
        projectPage.verifyRecordCount('Display 1-1 of 1');
    });

    it('Verify Clear filters button removes the Description filter and restores the full list', () => {
        projectFilterPage
            .verifyClearFiltersVisible()
            .clearAllFilters()
            .verifyNoActiveFilters();
        projectPage.verifyRecordCount('69');
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
        projectPage.verifyRecordCount('1');
    });

    it('Verify Clear filters removes all active filters and restores the full project list', () => {
        projectFilterPage
            .verifyClearFiltersVisible()
            .clearAllFilters()
            .verifyNoActiveFilters();
        projectPage.verifyRecordCount('69');
    });

    after(() => {
        cy.logout();
    });
});
