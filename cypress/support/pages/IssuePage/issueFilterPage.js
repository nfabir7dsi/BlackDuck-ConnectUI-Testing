import issueObject from '../../objects/IssueObjects/issueObject';
import issueFilterObject from '../../objects/IssueObjects/issueFilterObject';

class IssueFilterPage {

    // ─── Chip Verification ──────────────────────────────────────────────────

    verifyFilterChipCount(count) {
        cy.getByDataTestId(issueFilterObject.getFilterTrigger()).should('have.length', count);
        return this;
    }

    verifyFilterChipVisible(filterType) {
        cy.getByDataTestId(issueObject.getFiltersSection())
            .contains(filterType).should('be.visible');
        return this;
    }

    verifyFilterChipNotExists(filterType) {
        cy.getByDataTestId(issueObject.getFiltersSection())
            .should('not.contain.text', filterType);
        return this;
    }

    verifyChipLabelContains(filterType, value) {
        cy.getByDataTestId(issueFilterObject.getFilterTrigger())
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
        cy.getByDataTestId(issueObject.getFiltersSection()).children().children().should('have.length', 1);
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
        cy.getByDataTestId(issueFilterObject.getFilterTrigger())
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
        // cy.wait(500);
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

    verifyDialogInputAreaCount(count) {
        cy.getByDataTestId(issueFilterObject.getFilterContent())
            .find('input').should('have.length', count);
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

    selectNthOption(index) {
        cy.getByDataTestId(issueFilterObject.getFilterContent())
            .find(issueFilterObject.getFilterOption())
            .eq(index-1).click();
        cy.wait(500);
        return this;
    }

    verifyOptionIsSelected(optionText) {
        cy.getByDataTestId(issueFilterObject.getFilterContent())
            .contains(issueFilterObject.getFilterOption(), optionText).children('button')
            .should('have.attr', 'aria-checked', 'true');
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

    verifyFilterCountGreaterThan(count) {
        cy.getByDataTestId(issueFilterObject.getFilterSelectorGroup())
            .find(issueFilterObject.getFilterOption())
            .should('have.length.greaterThan', count);
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
        this.clearSearchInDialog();
        cy.getByDataTestId(issueFilterObject.getFilterContent())
            .find('input').type(text);
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

    verifyInputLabel(label) {
        cy.getByDataTestId(issueFilterObject.getFilterContent())
            .find('input').parent('label').should('have.text', label);
        return this;
    }

    // ─── Date Filter Actions ────────────────────────────────────────────────

    selectDateMode(mode) {
        cy.getByDataTestId(issueFilterObject.getFilterContent())
            .contains('label', mode).parent().children('button').click();
        cy.wait(500);
        return this;
    }

    verifyNumberInputIsVisible() {
        cy.getByDataTestId(issueFilterObject.getFilterContent())
            .find('input[type="number"]')
            .should('be.visible');
        return this;
    }

    enterSpinValue(value) {
        cy.getByDataTestId(issueFilterObject.getFilterContent())
            .find('input[type="number"], [role="spinbutton"]')
            .clear().type(value);
        cy.wait(300);
        return this;
    }

    verifyDateInputButtonIsVisible(number) {
        cy.getByDataTestId(issueFilterObject.getFilterContent())
            .find('button[aria-haspopup="dialog"]').should('have.length', number)
            .and('be.visible');
        return this;
    }


    selectTimeUnit(unit) {
        cy.getByDataTestId(issueFilterObject.getFilterContent())
            .find('button[role="combobox"]').click();
        cy.get(issueFilterObject.getFilterOption()).contains(unit).click();
        cy.wait(300);
        return this;
    }

    // dateStr: "YYYY-MM-DD"
    enterFromDate(dateStr) {
        this._pickDate(0, dateStr);
        return this;
    }

    // dateStr: "YYYY-MM-DD"
    enterToDate(dateStr) {
        this._pickDate(1, dateStr);
        return this;
    }

    // dateStr: "YYYY-MM-DD"  (used for After / Before — single picker)
    enterSingleDate(dateStr) {
        this._pickDate(0, dateStr);
        return this;
    }

    // Opens the calendar at pickerIndex (0 = From/single, 1 = To),
    // selects the month/year via the hidden dropdowns, then clicks the day.
    _pickDate(pickerIndex, dateStr) {
        const [year, month, day] = dateStr.split('-').map(Number);
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
        const ordinal = (n) => {
            if (n > 3 && n < 21) return n + 'th';
            switch (n % 10) {
                case 1: return n + 'st';
                case 2: return n + 'nd';
                case 3: return n + 'rd';
                default: return n + 'th';
            }
        };
        // "April 15th, 2026" — substring of aria-label "Wednesday, April 15th, 2026"
        const partialLabel = `${months[month - 1]} ${ordinal(day)}, ${year}`;
        const calSel = '[role="dialog"]:not([data-testid="filter-content"])';

        cy.getByDataTestId(issueFilterObject.getFilterContent())
            .find('button[aria-haspopup="dialog"]').eq(pickerIndex).click();
        cy.wait(300);

        // The calendar has hidden <select> dropdowns for month (0-based) and year
        cy.get(`${calSel} select[aria-label="Choose the Month"]`).select(String(month - 1), { force: true });
        cy.get(`${calSel} select[aria-label="Choose the Year"]`).select(String(year), { force: true });
        cy.wait(200);

        cy.get(`${calSel} button[aria-label*="${partialLabel}"]`).click();
        cy.wait(300);
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
        this.getTableRowCount().should('be.greaterThan', 0);
        return this;
    }

    getTableRowCount() {
        return cy.getByDataTestId(issueObject.getIssueTable())
            .find('tbody tr').its('length');
    }

    verifyTableHasRowCount(count) {
        this.getTableRowCount().should('eq', count);
        return this;
    }
}

export default new IssueFilterPage();
