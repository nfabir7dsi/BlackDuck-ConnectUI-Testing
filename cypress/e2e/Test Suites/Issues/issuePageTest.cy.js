import sidebar from '../../../support/pages/Sidebar/sidebar';
import projectPage from '../../../support/pages/ProjectPage/projectPage';
import issuePage from '../../../support/pages/IssuePage/issuePage';
import loginObjects from '../../../support/objects/LoginObjects/loginObjects';

describe('Issue Page Test Suite', { testIsolation: false }, () => {
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
                .clearFiltersIfPresent()
                .clickFirstProjectLink()
                .clearFiltersIfPresent();
    });

    after(() => {
        cy.logout();
    });

    // ── Suite 1: Page Load & Navigation ──────────────────────────────────────

    it('Navigating to a project loads the issue list page', () => {
        issuePage.verifyUrlContains(`/ui/projects/${data.project.title}`);
    });

    it('Page title displays the project name', () => {
        issuePage.verifyPageTitle(data.project.title);
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
        issuePage.clickProjectsBreadcrumbLink()
            .verifyNavigatedToProjectsListPage()
            .clickFirstProjectLink()
            .verifyTableVisible();
    });

    it('Project switcher combobox is visible in the breadcrumb', () => {
        issuePage.verifyProjectSwitcherVisible();
    });

    // ── Suite 3: Issue List Controls Bar ─────────────────────────────────────

    it('Issue list controls bar is visible', () => {
        issuePage.verifyControlsBarVisible();
    });

    it('View selector is visible and non-empty', () => {
        issuePage.verifyViewSelectorVisible()
            .verifyViewSelectorNonEmpty();
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
        issuePage.clickExportButton()
                .verifyExportMenuVisible()
                .closePanelWithEsc();
    });

    it('Column visibility toggle button is visible', () => {
        issuePage.verifyColumnToggleVisible();
    });

    it('Clicking column visibility toggle opens a column panel', () => {
        issuePage.clickColumnToggle()
                .verifyColumnPanelVisible()
                .closePanelWithEsc();
    });

    it('Toggling a column off hides it from the table', () => {
        issuePage.clickColumnToggle()
                .verifyColumnPanelVisible()
                .toggleColumnByName('Status')
                .closePanelWithEsc()
                .verifyColumnNotExists('status-column');
    });

    it('Toggling the column back on restores it in the table', () => {
        issuePage.clickColumnToggle()
                .verifyColumnPanelVisible()
                .toggleColumnByName('Status')
                .closePanelWithEsc()
                .verifyColumnVisible('status-column');
    });

    // ── Filter Clear ─────────────────────────────────────────

    it('Clearing filters if present before table tests', () => {
        issuePage.clearFiltersIfPresent();
    });

    // ── Suite 10: Sidebar CID Search ─────────────────────────────────────────

    it('Sidebar CID search input is visible', () => {
        issuePage.verifySidebarSearchVisible();
    });

    it('Typing in sidebar search accepts input', () => {
        issuePage.searchCIDInSidebar('11188')
            .verifySidebarSearchValue('11188')
            .clearSidebarSearch();
    });

    it('Clearing sidebar search input restores normal table state', () => {
        issuePage.searchCIDInSidebar('INVALID999999')
            .clearSidebarSearch()
            .verifySidebarSearchValue('')
            .verifyTableVisible();
    });

    // ── Suite 11: Pagination ─────────────────────────────────────────────────

    it('Record count is displayed', () => {
        issuePage.verifyRecordCount('1-25');
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
        issuePage.clickNextPage()
            .verifyRecordCount('26-50')
            .verifyPageActive(2);
    });

    it('Clicking Previous from page 2 returns to page 1', () => {
        issuePage.clickPreviousPage()
            .verifyRecordCount('1-25')
            .verifyPageActive(1);
    });

    it('Clicking a specific page number navigates to that page', () => {
        issuePage.clickPage(3)
            .verifyRecordCount('51-75')
            .verifyPageActive(3)
            .clickPage(1);        
    });

    it('Changing page size updates the record count display', () => {
        issuePage.changePageSize('50')
            .verifyRecordCount('1-50')
            .changePageSize('25');
    });

    it('Changing page size resets to page 1', () => {
        issuePage.verifyPageActive(1);
    });
});
