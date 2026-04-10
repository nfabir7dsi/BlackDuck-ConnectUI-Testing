import sidebar from '../../../support/pages/Sidebar/sidebar';
import projectPage from '../../../support/pages/ProjectPage/projectPage';
import issuePage from '../../../support/pages/IssuePage/issuePage';
import issueObject from '../../../support/objects/IssueObjects/issueObject';

describe('Issue Filter Test Suite', { testIsolation: false }, () => {
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
                .clearFiltersIfPresent()
                .clickFirstProjectLink()
                .clearFiltersIfPresent();
    });

    after(() => {
        cy.logout();
    });

    // Reset to the saved "High Impact Outstanding" view before each test
    // beforeEach(() => {
    //     issuePage.clickResetButton();
    //     cy.getByDataTestId(issueObject.getFilterTrigger()).should('have.length', 3);
    // });

    // ── Suite 4: Filter Chips Toolbar ─────────────────────────────────────────

    it('Three default filter chips are present on page load', () => {
        issuePage.verifyFilterChipCount(3);
    });

    it('Classification filter chip is visible', () => {
        issuePage.verifyFilterChipVisible('Classification');
    });

    it('Impact filter chip is visible', () => {
        issuePage.verifyFilterChipVisible('Impact');
    });

    it('Severity filter chip is visible', () => {
        issuePage.verifyFilterChipVisible('Severity');
    });

    it('"Add filters" button is visible', () => {
        issuePage.verifyAddFiltersButtonVisible();
    });

    it('"Clear filters" button is visible when filters are active', () => {
        issuePage.verifyClearFiltersVisible();
    });

    it('Removing Classification filter via its X button removes that chip', () => {
        issuePage.removeFilter('Classification');
        cy.getByDataTestId(issueObject.getFilterTrigger())
            .contains('Classification').should('not.exist');
        issuePage.verifyFilterChipCount(2);
    });

    it('Clearing all filters removes all chips from the toolbar', () => {
        issuePage.clearAllFilters();
        issuePage.verifyNoActiveFilters();
    });

    it('Clicking a filter chip body opens an edit dialog', () => {
        issuePage.clickFilterChip('Classification');
        cy.get('[role="dialog"]').should('be.visible');
        cy.get('body').type('{esc}');
    });

    it('"Add filters" dropdown shows available filter type options', () => {
        issuePage.openAddFilters();
        cy.get(issueObject.getFilterOption()).should('have.length.greaterThan', 0);
        cy.get('body').type('{esc}');
    });
});
