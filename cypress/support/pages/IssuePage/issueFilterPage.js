import issueObject from '../../objects/IssueObjects/issueObject';
import issueFilterObject from '../../objects/IssueObjects/issueFilterObject';

class IssueFilterPage {

    // ─── Chip Verification ──────────────────────────────────────────────────

    verifyFilterChipCount(count) {
        cy.getByDataTestId(issueObject.getFilterTrigger()).should('have.length', count);
        return this;
    }

    verifyFilterChipVisible(filterType) {
        cy.getByDataTestId(issueObject.getFilterTrigger())
            .contains(filterType).should('be.visible');
        return this;
    }

    verifyFilterChipNotExists(filterType) {
        cy.getByDataTestId(issueObject.getFiltersSection())
            .should('not.contain.text', filterType);
        return this;
    }

    verifyChipLabelContains(filterType, value) {
        cy.getByDataTestId(issueObject.getFilterTrigger())
            .filter(`:contains("${filterType}")`)
            .should('contain.text', value);
        return this;
    }

    verifyAddFiltersButtonVisible() {
        cy.getByDataTestId(issueObject.getFiltersSection())
            .contains('button', issueFilterObject.getAddFiltersText())
            .should('be.visible');
        return this;
    }

    verifyClearFiltersVisible() {
        cy.getByDataTestId(issueObject.getFiltersSection())
            .contains('button', issueObject.getClearFiltersText())
            .should('be.visible');
        return this;
    }

    verifyClearFiltersNotVisible() {
        cy.getByDataTestId(issueObject.getFiltersSection())
            .should('not.contain.text', issueObject.getClearFiltersText());
        return this;
    }

    verifyNoActiveFilters() {
        cy.getByDataTestId(issueObject.getFilterTrigger()).should('not.exist');
        return this;
    }

    // ─── Chip Actions ───────────────────────────────────────────────────────

    removeFilter(filterType) {
        cy.get(`[aria-label="${issueFilterObject.getRemoveFilterLabel(filterType)}"]`).click();
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

    // ─── Add Filters Dropdown ───────────────────────────────────────────────

    openAddFilters() {
        cy.getByDataTestId(issueObject.getFiltersSection())
            .contains('button', issueFilterObject.getAddFiltersText()).click();
        cy.get(issueFilterObject.getFilterBox()).should('be.visible');
        return this;
    }

    selectFilterFromDropdown(filterName) {
        cy.get(issueFilterObject.getFilterBox())
            .find(issueFilterObject.getFilterOption())
            .contains(filterName).click();
        cy.wait(300);
        return this;
    }

    addFilter(filterName) {
        this.openAddFilters();
        this.selectFilterFromDropdown(filterName);
        return this;
    }

    // ─── Filter Dialog ──────────────────────────────────────────────────────

    verifyFilterDialogVisible() {
        cy.getByDataTestId(issueFilterObject.getFilterContent()).should('be.visible');
        return this;
    }

    verifyFilterDialogNotExists() {
        cy.getByDataTestId(issueFilterObject.getFilterContent()).should('not.exist');
        return this;
    }

    verifyFilterDialogContains(text) {
        cy.getByDataTestId(issueFilterObject.getFilterContent())
            .should('contain.text', text);
        return this;
    }

    closeDialog() {
        cy.get('body').type('{esc}');
        cy.wait(300);
        return this;
    }

    clickOutsideDialog() {
        cy.getByDataTestId(issueObject.getIssueTable()).click({ force: true });
        cy.wait(300);
        return this;
    }

    // ─── Multi-select Option Actions ────────────────────────────────────────

    selectOption(optionText) {
        cy.getByDataTestId(issueFilterObject.getFilterContent())
            .contains(issueFilterObject.getFilterOption(), optionText).click();
        cy.wait(500);
        return this;
    }

    verifyAllOptions(expectedOptions) {
        expectedOptions.forEach(opt => {
            cy.getByDataTestId(issueFilterObject.getFilterContent())
                .contains(issueFilterObject.getFilterOption(), opt).should('exist');
        });
        return this;
    }

    verifyOptionCount(count) {
        cy.getByDataTestId(issueFilterObject.getFilterContent())
            .find(issueFilterObject.getFilterOption())
            .should('have.length', count);
        return this;
    }

    verifyOptionCountGreaterThan(count) {
        cy.getByDataTestId(issueFilterObject.getFilterContent())
            .find(issueFilterObject.getFilterOption())
            .should('have.length.greaterThan', count);
        return this;
    }

    // ─── Search Within Dialog ───────────────────────────────────────────────

    searchInDialog(text) {
        cy.getByDataTestId(issueFilterObject.getFilterContent())
            .find('input').clear().type(text);
        cy.wait(500);
        return this;
    }

    clearSearchInDialog() {
        cy.getByDataTestId(issueFilterObject.getFilterContent())
            .find('input').clear();
        cy.wait(500);
        return this;
    }

    // ─── Text / Numeric Filter Input ────────────────────────────────────────

    enterFilterValue(value) {
        cy.getByDataTestId(issueFilterObject.getFilterContent())
            .find('input').clear().type(value + '{enter}');
        cy.wait(500);
        return this;
    }

    clearFilterInput() {
        cy.getByDataTestId(issueFilterObject.getFilterContent())
            .find('input').clear().type('{enter}');
        cy.wait(500);
        return this;
    }

    verifyInputPlaceholder(placeholder) {
        cy.getByDataTestId(issueFilterObject.getFilterContent())
            .find('input').should('have.attr', 'placeholder', placeholder);
        return this;
    }

    // ─── Date Filter Actions ────────────────────────────────────────────────

    selectDateMode(mode) {
        cy.getByDataTestId(issueFilterObject.getFilterContent())
            .contains('label', mode).click();
        cy.wait(300);
        return this;
    }

    enterSpinValue(value) {
        cy.getByDataTestId(issueFilterObject.getFilterContent())
            .find('input[type="number"], [role="spinbutton"]')
            .clear().type(value);
        cy.wait(300);
        return this;
    }

    selectTimeUnit(unit) {
        cy.getByDataTestId(issueFilterObject.getFilterContent())
            .find('button[role="combobox"]').click();
        cy.get(issueFilterObject.getFilterOption()).contains(unit).click();
        cy.wait(300);
        return this;
    }

    enterFromDate(date) {
        cy.getByDataTestId(issueFilterObject.getFilterContent())
            .find('input[type="text"], input[placeholder]').first()
            .clear().type(date);
        cy.wait(300);
        return this;
    }

    enterToDate(date) {
        cy.getByDataTestId(issueFilterObject.getFilterContent())
            .find('input[type="text"], input[placeholder]').last()
            .clear().type(date);
        cy.wait(300);
        return this;
    }

    enterSingleDate(date) {
        cy.getByDataTestId(issueFilterObject.getFilterContent())
            .find('input[type="text"], input[placeholder]')
            .clear().type(date);
        cy.wait(300);
        return this;
    }

    applyDateFilter() {
        cy.getByDataTestId(issueFilterObject.getFilterContent())
            .find('button').contains('Apply').click();
        cy.wait(500);
        return this;
    }

    // ─── Radio / Binary Filter Actions ──────────────────────────────────────

    selectRadioOption(optionText) {
        cy.getByDataTestId(issueFilterObject.getFilterContent())
            .contains('label', optionText).click();
        cy.wait(500);
        return this;
    }

    // ─── Streams Dual-search Actions ────────────────────────────────────────

    searchIncludeStream(text) {
        cy.getByDataTestId(issueFilterObject.getFilterContent())
            .find('input').first()
            .clear().type(text);
        cy.wait(500);
        return this;
    }

    searchExcludeStream(text) {
        cy.getByDataTestId(issueFilterObject.getFilterContent())
            .find('input').last()
            .clear().type(text);
        cy.wait(500);
        return this;
    }

    selectStreamOption(streamName) {
        cy.getByDataTestId(issueFilterObject.getFilterContent())
            .contains(issueFilterObject.getFilterOption(), streamName).click();
        cy.wait(500);
        return this;
    }

    // ─── Table Result Verification ──────────────────────────────────────────

    verifyTableHasResults() {
        cy.getByDataTestId(issueObject.getIssueTable())
            .find('tbody tr').should('have.length.greaterThan', 0);
        return this;
    }

    getTableRowCount() {
        return cy.getByDataTestId(issueObject.getIssueTable())
            .find('tbody tr').its('length');
    }
}

export default new IssueFilterPage();
