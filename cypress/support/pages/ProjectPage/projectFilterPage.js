import projectFilterObject from '../../objects/ProjectObjects/projectFilterObject';

class ProjectFilterPage {

    // ─── Filter panel ────────────────────────────────────────────────────────

    verifyAddFiltersButtonVisible() {
        cy.getByDataTestId(projectFilterObject.getFiltersSection())
            .contains('button', projectFilterObject.getAddFiltersText())
            .should('be.visible');
        return this;
    }

    openFilters() {
        cy.getByDataTestId(projectFilterObject.getFiltersSection())
            .contains('button', projectFilterObject.getAddFiltersText()).click();
        cy.get(projectFilterObject.getFilterBox()).should('be.visible');
        return this;
    }

    // Verify all three filter type options are present in the dropdown listbox
    verifyAllFilterOptionsPresent() {
        cy.get(projectFilterObject.getFilterOption())
            .contains(projectFilterObject.getProjectFilterType()).should('be.visible');
        cy.get(projectFilterObject.getFilterOption())
            .contains(projectFilterObject.getDescriptionFilterType()).should('be.visible');
        cy.get(projectFilterObject.getFilterOption())
            .contains(projectFilterObject.getLastCommitFilterType()).should('be.visible');
        return this;
    }

    // Click a filter type option and wait for the filter-content panel to open
    selectFilterType(filterType) {
        cy.get(projectFilterObject.getFilterOption()).contains(filterType).click();
        cy.getByDataTestId(projectFilterObject.getFilterContent()).should('be.visible');
        return this;
    }

    // Dismiss any open filter panel by clicking the page outside the panel
    dismissFilterPanel() {
        cy.getByDataTestId('page-title').click({ force: true });
        cy.wait(300);
        return this;
    }

    // ─── Text filters (Project & Description) ─────────────────────────────────

    // Apply Project filter: type project name and press Enter
    applyProjectFilter(projectName) {
        this.openFilters();
        this.selectFilterType(projectFilterObject.getProjectFilterType());
        cy.getByDataTestId(projectFilterObject.getFilterContent())
            .find('input').type(projectName + '{enter}');
        cy.wait(500);
        return this;
    }

    // Apply Description filter: type description and press Enter
    applyDescriptionFilter(description) {
        this.openFilters();
        this.selectFilterType(projectFilterObject.getDescriptionFilterType());
        cy.getByDataTestId(projectFilterObject.getFilterContent())
            .find('input').type(description + '{enter}');
        cy.wait(500);
        return this;
    }

    // ─── Last Commit date filter ───────────────────────────────────────────────

    // Open filters and select "Last Commit" to expose date radio options
    openLastCommitFilter() {
        this.openFilters();
        this.selectFilterType(projectFilterObject.getLastCommitFilterType());
        return this;
    }

    // Assert all six date-mode radio buttons are present
    verifyLastCommitDateOptionsVisible() {
        cy.get('#' + projectFilterObject.getDateInRadio()).should('exist');
        cy.get('#' + projectFilterObject.getDateNotRadio()).should('exist');
        cy.get('#' + projectFilterObject.getDateRangeRadio()).should('exist');
        cy.get('#' + projectFilterObject.getDateExcludeRadio()).should('exist');
        cy.get('#' + projectFilterObject.getDateAfterRadio()).should('exist');
        cy.get('#' + projectFilterObject.getDateBeforeRadio()).should('exist');
        return this;
    }

    // Apply "In the last N <unit>" date filter.
    // unit: 'days' | 'weeks' | 'months'  (default: 'days')
    applyLastCommitInLastFilter(number, unit = 'days') {
        this.openFilters();
        this.selectFilterType(projectFilterObject.getLastCommitFilterType());
        cy.get('#' + projectFilterObject.getDateInRadio()).click();
        const numberInput = cy.getByDataTestId(projectFilterObject.getFilterContent())
            .find('input[type="number"]');
        numberInput.type(String(number));
        // Open unit combobox and select the requested unit
        cy.getByDataTestId(projectFilterObject.getFilterContent())
            .find('[role="combobox"]').click();
        cy.get(projectFilterObject.getFilterOption()).contains(unit).click();
        // Submit via Enter on the number input
        cy.getByDataTestId(projectFilterObject.getFilterContent())
            .find('input[type="number"]').type('{enter}');
        cy.wait(500);
        return this;
    }

    // ─── Active filter chips ──────────────────────────────────────────────────

    // Assert that a filter chip is visible and contains the filter type label
    verifyFilterChipVisible(filterType) {
        cy.getByDataTestId(projectFilterObject.getFilterTrigger())
            .contains(filterType).should('be.visible');
        return this;
    }

    // Assert exact text on a filter chip (e.g. "Project = AUTOSAR")
    verifyFilterChipText(expectedText) {
        cy.getByDataTestId(projectFilterObject.getFilterTrigger())
            .should('contain.text', expectedText);
        return this;
    }

    // Assert the number of active filter chips
    verifyActiveFilterCount(count) {
        cy.getByDataTestId(projectFilterObject.getFilterTrigger())
            .should('have.length', count);
        return this;
    }

    // Assert no filter chips are present
    verifyNoActiveFilters() {
        cy.getByDataTestId(projectFilterObject.getFilterTrigger()).should('not.exist');
        return this;
    }

    // ─── Filter chip actions ──────────────────────────────────────────────────

    // Remove a specific filter via its × button (aria-label="Remove <type> filter")
    removeFilter(filterType) {
        cy.get(`[aria-label="${projectFilterObject.getRemoveFilterLabel(filterType)}"]`).click();
        cy.wait(500);
        return this;
    }

    // Click Clear filters button to remove all active filters
    clearAllFilters() {
        cy.getByDataTestId(projectFilterObject.getFiltersSection())
            .contains('button', projectFilterObject.getClearFiltersText()).click();
        cy.wait(500);
        return this;
    }

    // Assert the Clear filters button is visible (only shown when ≥1 filter active)
    verifyClearFiltersVisible() {
        cy.getByDataTestId(projectFilterObject.getFiltersSection())
            .contains('button', projectFilterObject.getClearFiltersText())
            .should('be.visible');
        return this;
    }
}

export default new ProjectFilterPage();
