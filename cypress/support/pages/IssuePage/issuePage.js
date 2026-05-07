import issueObject from '../../objects/IssueObjects/issueObject';
import projectPage from '../ProjectPage/projectPage';

class IssuePage {

    // ─── Page Structure ───────────────────────────────────────────────────────

    verifyUrlContains(path) {
        cy.url().should('include', path);
        return this;
    }

    verifyPageTitle(title) {
        cy.getByDataTestId(issueObject.getPageTitle()).should('have.text', title);
        return this;
    }

    verifyPageHeaderVisible() {
        cy.getByDataTestId(issueObject.getPageHeader()).should('be.visible');
        return this;
    }

    verifyIssuesTabActive() {
        cy.getByDataTestId(issueObject.getIssuesTab()).should('have.attr', 'aria-selected', 'true');
        return this;
    }

    // ─── Breadcrumb ───────────────────────────────────────────────────────────

    verifyBreadcrumbVisible() {
        cy.getByDataTestId(issueObject.getBreadcrumbNav()).should('be.visible');
        return this;
    }

    verifyProjectsBreadcrumbLinkVisible() {
        cy.getByDataTestId(issueObject.getBreadcrumbProjectsLink()).should('be.visible');
        return this;
    }

    clickProjectsBreadcrumbLink() {
        cy.getByDataTestId(issueObject.getBreadcrumbProjectsLink()).click();
        return projectPage;
    }

    verifyProjectSwitcherVisible() {
        cy.getByDataTestId(issueObject.getProjectSwitcher()).should('be.visible');
        return this;
    }

    // ─── Controls Bar ─────────────────────────────────────────────────────────

    verifyControlsBarVisible() {
        cy.getByDataTestId(issueObject.getIssueListControls()).should('be.visible');
        return this;
    }

    verifyViewSelectorVisible() {
        cy.getByDataTestId(issueObject.getViewSelector()).should('be.visible');
        return this;
    }

    verifyViewSelectorNonEmpty() {
        cy.getByDataTestId(issueObject.getViewSelector()).invoke('text').should('not.be.empty');
        return this;
    }

    verifySaveButtonVisible() {
        cy.getByDataTestId(issueObject.getSaveButton()).should('be.visible');
        return this;
    }

    verifyResetButtonVisible() {
        cy.getByDataTestId(issueObject.getResetChangesButton()).should('be.visible');
        return this;
    }

    verifyAIBannerVisible() {
        cy.contains('Let AI assist with triaging issues!').should('be.visible');
        return this;
    }

    clickResetButton() {
        cy.getByDataTestId(issueObject.getResetChangesButton()).click({ force: true });
        cy.wait(1000);
        return this;
    }

    clearFiltersIfPresent() {
        cy.waitTillVisible(`[data-testid="${issueObject.getFilterTrigger()}"]`);
        cy.get('body').then(($body) => {
            if ($body.find(`[data-testid="${issueObject.getFiltersSection()}"]`).text().includes(issueObject.getClearFiltersText())) {
                cy.getByDataTestId(issueObject.getFiltersSection())
                    .contains('button', issueObject.getClearFiltersText()).click();
                cy.wait(1000);
            }
        });
        cy.log('Cleared issue filters if they were pr esent');
        return this;
    }

    // ─── Actions Section ──────────────────────────────────────────────────────

    verifyExportButtonVisible() {
        cy.getByDataTestId(issueObject.getExportButton()).should('be.visible');
        return this;
    }

    clickExportButton() {
        cy.getByDataTestId(issueObject.getExportButton()).click();
        return this;
    }

    verifyExportMenuVisible() {
        cy.get(issueObject.getExportMenu()).should('be.visible');
        return this;
    }

    verifyColumnToggleVisible() {
        cy.getByDataTestId(issueObject.getColumnToggle()).should('be.visible');
        return this;
    }

    clickColumnToggle() {
        cy.getByDataTestId(issueObject.getColumnToggle()).click();
        return this;
    }

    verifyColumnPanelVisible() {
        cy.get(issueObject.getColumnPanel()).should('be.visible');
        return this;
    }

    closePanelWithEsc() {
        cy.get('body').type('{esc}');
        cy.wait(500);
        return this;
    }

    toggleColumnByName(columnName) {
        cy.get(issueObject.getColumnMenuItemCheckbox()).contains(columnName).click();
        cy.wait(500);
        return this;
    }

    showColumnIfNotVisible(columnTestId, columnName) {
        cy.get('body').then(($body) => {
            if ($body.find(`[data-testid="${columnTestId}"]`).length > 0) return;
            this.clickColumnToggle();
            this.toggleColumnByName(columnName);
            this.closePanelWithEsc();
        });
        return this;
    }

    // ─── Table ────────────────────────────────────────────────────────────────

    verifyTableVisible() {
        cy.getByDataTestId(issueObject.getIssueTable()).should('be.visible');
        return this;
    }

    verifyTableHasRows() {
        cy.waitTillVisible(`[data-testid="${issueObject.getIssueTable()}"] tbody tr`);
        return this;
    }

    scrollTableToTop() {
        cy.getByDataTestId(issueObject.getIssueTable())
            .parent().parent()
            .scrollTo('top', { ensureScrollable: false });
        cy.waitTillVisible(`[data-testid="${issueObject.getIssueTable()}"] tbody tr`);
        return this;
    }

    verifyColumnVisible(columnTestId) {
        cy.getByDataTestId(columnTestId).scrollIntoView();
        cy.getByDataTestId(columnTestId).should('be.visible');
        return this;
    }

    verifyColumnNotExists(columnTestId) {
        cy.getByDataTestId(columnTestId).should('not.exist');
        return this;
    }

    verifySelectAllCheckboxVisible() {
        cy.get('[data-testid="select-row"][aria-label="Select all rows"]').scrollIntoView().should('be.visible');
        return this;
    }

    verifyFirstRowHasData() {
        cy.getByDataTestId(issueObject.getIssueTable())
            .find('tbody tr').eq(0).within(() => {
                cy.get('[data-testid$="-cid-column"]').invoke('text').should('not.be.empty');
                cy.get('[data-testid$="-status-column"]').invoke('text').should('not.be.empty');
                cy.get('[data-testid$="-classification-column"]').invoke('text').should('not.be.empty');
            });
        return this;
    }

    // ─── Sorting ──────────────────────────────────────────────────────────────

    resetSortToDefault(maxAttempts = 5) {
        if (maxAttempts === 0) throw new Error('Could not reset sort to default after max attempts');
        cy.url().then((url) => {
            if (url.includes('sortColumn=&sortOrder=')) return;
            this.sortByColumn(issueObject.getCidColumn());
            this.resetSortToDefault(maxAttempts - 1);
        });
        return this;
    }
    
    sortByColumn(columnTestId) {
        cy.getByDataTestId(columnTestId).scrollIntoView();
        cy.getByDataTestId(columnTestId).click();
        cy.wait(1000);
        cy.getByDataTestId(issueObject.getIssueTable())
            .parent()
            .scrollTo('top', { ensureScrollable: false });
        cy.waitTillVisible(`[data-testid="${issueObject.getIssueTable()}"] tbody tr`);
        return this;
    }

    verifyUrlSortParam(sortColumn, sortOrder) {
        cy.url().should('include', `sortColumn=${sortColumn}`);
        cy.url().should('include', `sortOrder=${sortOrder}`);
        return this;
    }

    // ─── Row Selection ────────────────────────────────────────────────────────

    clickRowCheckbox(rowIndex) {
        this.scrollTableToTop();
        cy.getByDataTestId(issueObject.getIssueTable())
            .find('tbody tr').eq(rowIndex).children().children('button')
            .click({ force: true });
        return this;
    }

    clickSelectAll() {
        cy.get('[data-testid="select-row"][aria-label="Select all rows"]').click();
        return this;
    }

    verifyRowCheckboxChecked(rowIndex) {
        this.scrollTableToTop();
        cy.getByDataTestId(issueObject.getIssueTable())
            .find('tbody tr').eq(rowIndex).children().children('button')
            .should('have.attr', 'data-state', 'checked');
        return this;
    }

    verifyRowCheckboxUnchecked(rowIndex) {
        this.scrollTableToTop();
        cy.getByDataTestId(issueObject.getIssueTable())
            .find('tbody tr').eq(rowIndex).children().children('button')
            .should('have.attr', 'data-state', 'unchecked');
        return this;
    }

    verifySelectAllChecked() {
        cy.get('[data-testid="select-row"][aria-label="Select all rows"]')
            .should('have.attr', 'aria-checked', 'true');
        return this;
    }

    verifySelectAllUnchecked() {
        cy.get('[data-testid="select-row"][aria-label="Select all rows"]')
            .should('have.attr', 'aria-checked', 'false');
        return this;
    }

    // ─── Row Navigation ───────────────────────────────────────────────────────

    clickRow(rowIndex) {
        this.scrollTableToTop();
        cy.getByDataTestId(issueObject.getIssueTable())
            .find('tbody tr').eq(rowIndex)
            .find('[data-testid$="-cid-column"]').click();
        return this;
    }

    clickRowAndVerifyCidInUrl(rowIndex) {
        this.scrollTableToTop();
        cy.getByDataTestId(issueObject.getIssueTable())
            .find('tbody tr').eq(rowIndex)
            .find('[data-testid$="-cid-column"]').as('cidCell');
        cy.get('@cidCell').invoke('text').then((cid) => {
            cy.get('@cidCell').click();
            cy.url().should('include', cid.trim());
        });
        return this;
    }

    // ─── Pagination ───────────────────────────────────────────────────────────

    verifyRecordCount(text) {
        cy.getByDataTestId(issueObject.getRecordCount()).should('contain.text', text);
        return this;
    }

    verifyPreviousPageDisabled() {
        cy.getByDataTestId(issueObject.getPreviousPageButton()).should('be.disabled');
        return this;
    }

    verifyNextPageEnabled() {
        cy.getByDataTestId(issueObject.getNextPageButton()).should('not.be.disabled');
        return this;
    }

    clickNextPage() {
        cy.getByDataTestId(issueObject.getNextPageButton()).click();
        cy.wait(500);
        return this;
    }

    clickPreviousPage() {
        cy.getByDataTestId(issueObject.getPreviousPageButton()).click();
        cy.wait(500);
        return this;
    }

    clickPage(n) {
        cy.getByDataTestId(issueObject.getPageButton(n)).click();
        cy.wait(500);
        return this;
    }

    verifyPageActive(n) {
        cy.getByDataTestId(issueObject.getPageButton(n))
            .should('have.class', 'border-input');
        return this;
    }

    verifyEllipsisVisible() {
        cy.getByDataTestId(issueObject.getEllipsisEnd()).should('be.visible');
        return this;
    }

    verifyPageSizeContains(text) {
        cy.getByDataTestId(issueObject.getPageSizeSelect()).should('contain.text', text);
        return this;
    }

    changePageSize(size) {
        cy.getByDataTestId(issueObject.getPageSizeSelect()).click();
        cy.get('[role="option"]').contains(String(size)).click();
        cy.wait(500);
        return this;
    }

    // ─── Sidebar Search ───────────────────────────────────────────────────────

    verifySidebarSearchVisible() {
        cy.getByDataTestId(issueObject.getSidebarSearchInput()).should('be.visible');
        return this;
    }

    searchCIDInSidebar(cid) {
        cy.getByDataTestId(issueObject.getSidebarSearchInput())
            .clear().type(cid);
        cy.wait(500);
        return this;
    }

    clearSidebarSearch() {
        cy.getByDataTestId(issueObject.getSidebarSearchInput()).clear();
        cy.wait(300);
        return this;
    }

    verifySidebarSearchValue(value) {
        cy.getByDataTestId(issueObject.getSidebarSearchInput()).should('have.value', value);
        return this;
    }
}

export default new IssuePage();
