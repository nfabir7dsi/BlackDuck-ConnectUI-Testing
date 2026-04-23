class ProjectObject {
    // Page structure
    projectHeader = 'page-title';

    // Toolbar
    searchButton = 'project-search-button';
    searchInput = 'project-search-input';
    searchResult = 'project-search-results';
    viewOptionsToggle = 'view-options-trigger';
    exportButton = 'export-menu-button';

    // Table
    projectTable = 'project-list-table';
    projectColumnHeader = 'project-column';
    descriptionColumnHeader = 'projectDescription-column';
    lastCommitColumnHeader = 'lastSnapshotDate-column';
    tableBody = 'record-list-table-body';

    // Row cells (index-based)
    firstRowProjectCell = 'row-0-project-column';
    firstRowDescriptionCell = 'row-0-projectDescription-column';
    firstRowLastCommitCell = 'row-0-lastSnapshotDate-column';

    // Filters
    filtersSection = 'filters-section';
    filterTrigger = 'filter-trigger';
    filterContent = 'filter-content';
    clearFiltersText = 'Clear filters';
    filterBox = '[role="listbox"]';
    filterElement = '[role="option"]';

    // Pagination
    recordCount = 'record-count';

    getProjectHeader() { return this.projectHeader; }
    getSearchButton() { return this.searchButton; }
    getSearchInput() { return this.searchInput; }
    getSearchResult() { return this.searchResult; }
    getSearchInputSelector() { return `[data-testid="${this.searchInput}"]`; }
    getViewOptionsToggle() { return this.viewOptionsToggle; }
    getExportButton() { return this.exportButton; }
    getProjectTable() { return this.projectTable; }
    getProjectColumnHeader() { return this.projectColumnHeader; }
    getDescriptionColumnHeader() { return this.descriptionColumnHeader; }
    getLastCommitColumnHeader() { return this.lastCommitColumnHeader; }
    getTableBody() { return this.tableBody; }
    getFirstRowProjectCell() { return this.firstRowProjectCell; }
    getFirstRowDescriptionCell() { return this.firstRowDescriptionCell; }
    getFirstRowLastCommitCell() { return this.firstRowLastCommitCell; }
    getFiltersSection() { return this.filtersSection; }
    getFilterTrigger() { return this.filterTrigger; }
    getFilterContent() { return this.filterContent; }
    getClearFiltersText() { return this.clearFiltersText; }
    getRecordCount() { return this.recordCount; }
    getFilterBox() { return this.filterBox; }
    getFilterElement() { return this.filterElement; }

    getProjectLinkId(projectName) {
        return `project-list-project-link-${projectName}`;
    }
}

export default new ProjectObject();
