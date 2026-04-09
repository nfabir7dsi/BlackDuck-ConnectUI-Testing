class ProjectFilterObject {
    // Filter section wrapper
    filtersSection = 'filters-section';

    // Filter panel elements (CSS selectors, not data-testid)
    filterBox = '[role="listbox"]';
    filterOption = '[role="option"]';

    // Filter content panel
    filterContent = 'filter-content';

    // Active filter chips
    filterTrigger = 'filter-trigger';

    // Button text labels
    addFiltersText = 'Add filters';
    clearFiltersText = 'Clear filters';

    // Filter type names shown in the dropdown listbox
    projectFilterType = 'Project';
    descriptionFilterType = 'Description';
    lastCommitFilterType = 'Last Commit';

    // Last Commit — radio button element IDs (id="date-in", etc.)
    dateInRadio = 'date-in';         // "In the last"
    dateNotRadio = 'date-not';       // "Not in the last"
    dateRangeRadio = 'date-range';   // "In the range"
    dateExcludeRadio = 'date-exclude'; // "Exclude"
    dateAfterRadio = 'date-after';   // "After"
    dateBeforeRadio = 'date-before'; // "Before"

    getFiltersSection() { return this.filtersSection; }
    getFilterBox() { return this.filterBox; }
    getFilterOption() { return this.filterOption; }
    getFilterContent() { return this.filterContent; }
    getFilterTrigger() { return this.filterTrigger; }
    getAddFiltersText() { return this.addFiltersText; }
    getClearFiltersText() { return this.clearFiltersText; }
    getProjectFilterType() { return this.projectFilterType; }
    getDescriptionFilterType() { return this.descriptionFilterType; }
    getLastCommitFilterType() { return this.lastCommitFilterType; }
    getDateInRadio() { return this.dateInRadio; }
    getDateNotRadio() { return this.dateNotRadio; }
    getDateRangeRadio() { return this.dateRangeRadio; }
    getDateExcludeRadio() { return this.dateExcludeRadio; }
    getDateAfterRadio() { return this.dateAfterRadio; }
    getDateBeforeRadio() { return this.dateBeforeRadio; }

    // Returns the aria-label used on the remove button for a given filter type
    getRemoveFilterLabel(filterType) {
        return `Remove ${filterType} filter`;
    }
}

export default new ProjectFilterObject();
