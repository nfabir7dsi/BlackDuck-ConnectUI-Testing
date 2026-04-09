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
        cy.wait(10000); 
        cy.get('body').then(($body) => {
            if ($body.find(`[data-testid="${issueObject.getFiltersSection()}"]`).text().includes(issueObject.getClearFiltersText())) {
                cy.getByDataTestId(issueObject.getFiltersSection())
                    .contains('button', issueObject.getClearFiltersText()).click();
                cy.wait(500);
            }
        });
        cy.log('Cleared issue filters if they were present');
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

    verifyColumnToggleVisible() {
        cy.getByDataTestId(issueObject.getColumnToggle()).should('be.visible');
        return this;
    }

    clickColumnToggle() {
        cy.getByDataTestId(issueObject.getColumnToggle()).click();
        return this;
    }

    // ─── Filters ──────────────────────────────────────────────────────────────

    verifyFilterChipCount(count) {
        cy.getByDataTestId(issueObject.getFilterTrigger()).should('have.length', count);
        return this;
    }

    verifyFilterChipVisible(filterType) {
        cy.getByDataTestId(issueObject.getFilterTrigger())
            .contains(filterType).should('be.visible');
        return this;
    }

    verifyAddFiltersButtonVisible() {
        cy.getByDataTestId(issueObject.getFiltersSection())
            .contains('button', issueObject.getAddFiltersText())
            .should('be.visible');
        return this;
    }

    verifyClearFiltersVisible() {
        cy.getByDataTestId(issueObject.getFiltersSection())
            .contains('button', issueObject.getClearFiltersText())
            .should('be.visible');
        return this;
    }

    verifyNoActiveFilters() {
        cy.getByDataTestId(issueObject.getFilterTrigger()).should('not.exist');
        return this;
    }

    removeFilter(filterType) {
        cy.get(`[aria-label="${issueObject.getRemoveFilterLabel(filterType)}"]`).click();
        cy.wait(500);
        return this;
    }

    clearAllFilters() {
        cy.getByDataTestId(issueObject.getFiltersSection())
            .contains('button', issueObject.getClearFiltersText()).click();
        cy.wait(500);
        return this;
    }

    clickFilterChip(filterType) {
        cy.getByDataTestId(issueObject.getFilterTrigger())
            .contains(filterType).click();
        return this;
    }

    openAddFilters() {
        cy.getByDataTestId(issueObject.getFiltersSection())
            .contains('button', issueObject.getAddFiltersText()).click();
        cy.get(issueObject.getFilterBox()).should('be.visible');
        return this;
    }

    // ─── Table ────────────────────────────────────────────────────────────────

    verifyTableVisible() {
        cy.getByDataTestId(issueObject.getIssueTable()).should('be.visible');
        return this;
    }

    verifyTableHasRows() {
        cy.getByDataTestId('row-0').should('exist');
        return this;
    }

    verifyColumnVisible(columnTestId) {
        cy.getByDataTestId(columnTestId).should('be.visible');
        return this;
    }

    verifyColumnNotExists(columnTestId) {
        cy.getByDataTestId(columnTestId).should('not.exist');
        return this;
    }

    verifySelectAllCheckboxVisible() {
        cy.get('[data-testid="select-row"][aria-label="Select all rows"]').should('be.visible');
        return this;
    }

    verifyFirstRowHasData() {
        cy.getByDataTestId(issueObject.getRowCell(0, 'cid')).invoke('text').should('not.be.empty');
        cy.getByDataTestId(issueObject.getRowCell(0, 'status')).invoke('text').should('not.be.empty');
        cy.getByDataTestId(issueObject.getRowCell(0, 'classification')).invoke('text').should('not.be.empty');
        return this;
    }

    // ─── Sorting ──────────────────────────────────────────────────────────────

    sortByColumn(columnTestId) {
        cy.getByDataTestId(columnTestId).click();
        cy.wait(500);
        return this;
    }

    verifyUrlSortParam(sortColumn, sortOrder) {
        cy.url().should('include', `sortColumn=${sortColumn}`);
        cy.url().should('include', `sortOrder=${sortOrder}`);
        return this;
    }

    // ─── Row Selection ────────────────────────────────────────────────────────

    clickRowCheckbox(rowIndex) {
        cy.getByDataTestId(`row-${rowIndex}`)
            .find('[data-testid="select-row"]').click();
        return this;
    }

    clickSelectAll() {
        cy.get('[data-testid="select-row"][aria-label="Select all rows"]').click();
        return this;
    }

    verifyRowCheckboxChecked(rowIndex) {
        cy.getByDataTestId(`row-${rowIndex}`)
            .find('[data-testid="select-row"]')
            .should('have.attr', 'aria-checked', 'true');
        return this;
    }

    verifyRowCheckboxUnchecked(rowIndex) {
        cy.getByDataTestId(`row-${rowIndex}`)
            .find('[data-testid="select-row"]')
            .should('have.attr', 'aria-checked', 'false');
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
        cy.getByDataTestId(issueObject.getRowCell(rowIndex, 'cid')).click();
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
            .should('have.attr', 'aria-current', 'page');
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
}

export default new IssuePage();
