import sidebar from '../../../support/pages/Sidebar/sidebar';
import projectPage from '../../../support/pages/ProjectPage/projectPage';
import issuePage from '../../../support/pages/IssuePage/issuePage';
import issueObject from '../../../support/objects/IssueObjects/issueObject';

describe('Issue Page Test Suite', { testIsolation: false }, () => {
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

    // ── Suite 1: Page Load & Navigation ──────────────────────────────────────

    it('Navigating to a project loads the issue list page', () => {
        issuePage.verifyUrlContains('/ui/projects/');
    });

    it('Page title displays the project name', () => {
        issuePage.verifyPageTitle('200 snapshots project');
    });

    it('Issues tab is active by default', () => {
        issuePage.verifyIssuesTabActive();
    });

    it('Page header section is visible', () => {
        issuePage.verifyPageHeaderVisible();
    });

    // ── Suite 2: Breadcrumb Navigation ───────────────────────────────────────

    it('Breadcrumb navigation bar is visible', () => {
        issuePage.verifyBreadcrumbVisible();
    });

    it('"Projects" breadcrumb link is visible', () => {
        issuePage.verifyProjectsBreadcrumbLinkVisible();
    });

    it('"Projects" breadcrumb link navigates back to the projects list', () => {
        issuePage.clickProjectsBreadcrumbLink();
        cy.url().should('include', '/ui/projects');
        cy.url().should('not.match', /\/ui\/projects\/.+/);
        // Navigate back to the issue list for subsequent tests
        projectPage.clickFirstProjectLink();
        cy.getByDataTestId(issueObject.getIssueTable()).should('be.visible');
    });

    it('Project switcher combobox is visible in the breadcrumb', () => {
        issuePage.verifyProjectSwitcherVisible();
    });

    // ── Suite 3: Issue List Controls Bar ─────────────────────────────────────

    it('Issue list controls bar is visible', () => {
        issuePage.verifyControlsBarVisible();
    });

    it('View selector is visible and non-empty', () => {
        issuePage.verifyViewSelectorVisible();
        issuePage.verifyViewSelectorNonEmpty();
    });

    it('Save button is visible', () => {
        issuePage.verifySaveButtonVisible();
    });

    it('Reset changes button is visible', () => {
        issuePage.verifyResetButtonVisible();
    });

    it('AI Assist banner is visible', () => {
        issuePage.verifyAIBannerVisible();
    });

    // ── Suite 5: Actions Bar ─────────────────────────────────────────────────

    it('Export button is visible', () => {
        issuePage.verifyExportButtonVisible();
    });

    it('Clicking export button opens an export menu', () => {
        issuePage.clickExportButton();
        cy.get('[role="menu"], [role="dialog"], [role="listbox"]').should('be.visible');
        cy.get('body').type('{esc}');
    });

    it('Column visibility toggle button is visible', () => {
        issuePage.verifyColumnToggleVisible();
    });

    it('Clicking column visibility toggle opens a column panel', () => {
        issuePage.clickColumnToggle();
        cy.get('[role="menu"], [role="dialog"]').should('be.visible');
        cy.get('body').type('{esc}');
    });

    it('Toggling a column off hides it from the table', () => {
        issuePage.clickColumnToggle();
        cy.contains('[role="menuitem"]', 'Owner').click();
        issuePage.verifyColumnNotExists(issueObject.getOwnerColumn());
    });

    it('Toggling the column back on restores it in the table', () => {
        issuePage.clickColumnToggle();
        cy.contains('[role="menuitem"]', 'Owner').click();
        issuePage.verifyColumnVisible(issueObject.getOwnerColumn());
    });

    // ── Suite 10: Sidebar CID Search ─────────────────────────────────────────

    it('Sidebar CID search input is visible', () => {
        issuePage.verifySidebarSearchVisible();
    });

    it('Typing in sidebar search accepts input', () => {
        issuePage.searchCIDInSidebar('11188');
        cy.getByDataTestId(issueObject.getSidebarSearchInput()).should('have.value', '11188');
        issuePage.clearSidebarSearch();
    });

    it('Clearing sidebar search input restores normal table state', () => {
        issuePage.searchCIDInSidebar('INVALID999999');
        issuePage.clearSidebarSearch();
        cy.getByDataTestId(issueObject.getSidebarSearchInput()).should('have.value', '');
        issuePage.verifyTableVisible();
    });

    // ── Suite 11: Pagination ─────────────────────────────────────────────────

    it('Record count is displayed', () => {
        issuePage.verifyRecordCount('1-25 of');
    });

    it('Previous page button is disabled on page 1', () => {
        issuePage.verifyPreviousPageDisabled();
    });

    it('Next page button is enabled on page 1', () => {
        issuePage.verifyNextPageEnabled();
    });

    it('Ellipsis button is visible for large result sets', () => {
        issuePage.verifyEllipsisVisible();
    });

    it('Page size selector shows "25" by default', () => {
        issuePage.verifyPageSizeContains('25');
    });

    it('Clicking Next navigates to page 2 and updates the record count', () => {
        issuePage.clickNextPage();
        issuePage.verifyRecordCount('26-50 of');
        issuePage.verifyPageActive(2);
    });

    it('Clicking Previous from page 2 returns to page 1', () => {
        issuePage.clickPreviousPage();
        issuePage.verifyRecordCount('1-25 of');
        issuePage.verifyPageActive(1);
    });

    it('Clicking a specific page number navigates to that page', () => {
        issuePage.clickPage(3);
        issuePage.verifyRecordCount('51-75 of');
        issuePage.verifyPageActive(3);
        // Return to page 1 for subsequent tests
        issuePage.clickPage(1);
    });

    it('Changing page size updates the record count display', () => {
        issuePage.changePageSize('50');
        issuePage.verifyRecordCount('1-50 of');
    });

    it('Changing page size resets to page 1', () => {
        issuePage.verifyPageActive(1);
    });
});
