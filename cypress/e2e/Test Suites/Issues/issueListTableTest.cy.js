import sidebar from '../../../support/pages/Sidebar/sidebar';
import issuePage from '../../../support/pages/IssuePage/issuePage';
import issueObject from '../../../support/objects/IssueObjects/issueObject';
import loginObjects from '../../../support/objects/LoginObjects/loginObjects';


describe('Issue List Table Test Suite', { testIsolation: false }, () => {
    let data;

    before(() => {
        cy.fixture('coverity').then((fixture) => {
            data = fixture;
            cy.visit(data.baseURL);
            cy.waitForVisible(loginObjects.getLoginPageHeader());
            // cy.wait(10000);
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

    // ── Suite 6: Table Structure (partial — 6.1–6.4, 6.14–6.16) ─────────────

    it('Issue table is visible', () => {
        issuePage.verifyTableVisible();
    });

    it('Table body renders rows', () => {
        issuePage.verifyTableHasRows();
    });

    it('CID column header is visible', () => {
        issuePage.verifyColumnVisible(issueObject.getCidColumn());
    });

    it('Status column header is visible', () => {
        issuePage.verifyColumnVisible(issueObject.getStatusColumn());
    });

    it('First row cells contain data', () => {
        issuePage.verifyFirstRowHasData();
    });

    it('Select-all checkbox is present in the table header', () => {
        issuePage.verifySelectAllCheckboxVisible();
    });

    // ── Suite 7: Column Sorting ───────────────────────────────────────────────

    it('Default sort is CID descending', () => {
        issuePage.verifyUrlSortParam('cid', 'desc');
    });

    it('Clicking CID column header toggles sort direction to ascending', () => {
        issuePage.sortByColumn(issueObject.getCidColumn());
        issuePage.verifyUrlSortParam('cid', 'asc');
    });

    it('Clicking Status column header sorts by status', () => {
        issuePage.sortByColumn(issueObject.getStatusColumn());
        cy.url().should('include', 'sortColumn=status');
    });

    it('Clicking First Detected column header sorts by firstDetected', () => {
        issuePage.sortByColumn(issueObject.getFirstDetectedColumn());
        cy.url().should('include', 'sortColumn=firstDetected');
    });

    it('Clicking Severity column header sorts by severity', () => {
        issuePage.sortByColumn(issueObject.getSeverityColumn());
        cy.url().should('include', 'sortColumn=severity');
    });

    it('Clicking Classification column header sorts by classification', () => {
        issuePage.sortByColumn(issueObject.getClassificationColumn());
        cy.url().should('include', 'sortColumn=classification');
    });

    // ── Suite 8: Row Selection ────────────────────────────────────────────────

    it('Individual row checkbox selects a row', () => {
        issuePage.clickRowCheckbox(0);
        issuePage.verifyRowCheckboxChecked(0);
        // Clean up — deselect
        issuePage.clickRowCheckbox(0);
    });

    it('Select-all checkbox selects all visible rows', () => {
        issuePage.clickSelectAll();
        issuePage.verifySelectAllChecked();
        issuePage.verifyRowCheckboxChecked(0);
        issuePage.verifyRowCheckboxChecked(1);
    });

    it('Clicking select-all again deselects all rows', () => {
        issuePage.clickSelectAll();
        issuePage.verifySelectAllUnchecked();
        issuePage.verifyRowCheckboxUnchecked(0);
    });

    it('Deselecting a row after select-all changes select-all to non-checked', () => {
        issuePage.clickSelectAll();
        issuePage.verifySelectAllChecked();
        issuePage.clickRowCheckbox(0);
        issuePage.verifyRowCheckboxUnchecked(0);
        cy.get('[data-testid="select-row"][aria-label="Select all rows"]')
            .should('not.have.attr', 'aria-checked', 'true');
        // Clean up
        issuePage.clickSelectAll();
        issuePage.clickSelectAll();
    });

    // ── Suite 9: Issue Detail Navigation (last — navigates away) ─────────────

    it('Clicking a row navigates to the issue detail page', () => {
        issuePage.clickRow(0);
        cy.url().should('not.include', 'offset=0&rowCount');
        cy.url().should('match', /\/ui\/projects\/.+/);
    });

    it('Browser back returns to the issue list', () => {
        cy.go('back');
        cy.getByDataTestId(issueObject.getIssueTable()).should('be.visible');
        issuePage.verifyUrlContains('/ui/projects/');
    });
});
