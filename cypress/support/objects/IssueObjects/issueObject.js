class IssueObject {
    // Breadcrumb
    breadcrumbNav = 'breadcrumb-nav';
    breadcrumbProjectsLink = 'breadcrumb-link-Projects';
    projectSwitcher = 'autocomplete-search-box';

    // Page structure
    pageHeader = 'page-header';
    pageTitle = 'page-title';
    issuesTab = 'tabs-trigger-nav.tab.projects.defects';

    // Issue list controls bar
    issueListControls = 'issueList-controls';
    viewSelector = 'project-list-view-select-trigger';
    saveButton = 'save-button';
    resetChangesButton = 'reset-changes-button';

    // Actions section
    exportButton = 'export-menu-button';
    columnToggle = 'view-options-trigger';

    // Filters
    filtersSection = 'filters-section';
    filterTrigger = 'filter-trigger';
    filterContent = 'filter-content';
    filterBox = '[role="listbox"]';
    filterOption = '[role="option"]';
    addFiltersText = 'Add filters';
    clearFiltersText = 'Clear filters';

    // Table
    issueTable = 'issue-list-table';
    tableBody = 'record-list-table-body';

    // Column headers
    cidColumn = 'cid-column';
    statusColumn = 'status-column';
    firstDetectedColumn = 'firstDetected-column';
    ownerColumn = 'owner-column';
    classificationColumn = 'classification-column';
    severityColumn = 'severity-column';
    actionColumn = 'action-column';
    componentColumn = 'displayComponent-column';
    categoryColumn = 'displayCategory-column';
    fileColumn = 'displayFile-column';
    functionColumn = 'displayFunction-column';
    countColumn = 'occurrenceCount-column';

    // Pagination
    recordCount = 'record-count';
    previousPageButton = 'previous-page-button';
    nextPageButton = 'next-page-button';
    ellipsisEnd = 'ellipsis-button-end';
    pageSizeSelect = 'page-size-select';

    // Sidebar search
    sidebarSearchInput = 'search-input-sidebar';

    // Menus and panels (CSS role selectors)
    exportMenu = '[role="menu"], [role="dialog"], [role="listbox"]';
    columnPanel = '[role="menu"], [role="dialog"]';
    columnMenuItemCheckbox = '[role="menuitemcheckbox"]';

    getBreadcrumbNav() { return this.breadcrumbNav; }
    getBreadcrumbProjectsLink() { return this.breadcrumbProjectsLink; }
    getProjectSwitcher() { return this.projectSwitcher; }
    getPageHeader() { return this.pageHeader; }
    getPageTitle() { return this.pageTitle; }
    getIssuesTab() { return this.issuesTab; }
    getIssueListControls() { return this.issueListControls; }
    getViewSelector() { return this.viewSelector; }
    getSaveButton() { return this.saveButton; }
    getResetChangesButton() { return this.resetChangesButton; }
    getExportButton() { return this.exportButton; }
    getColumnToggle() { return this.columnToggle; }
    getFiltersSection() { return this.filtersSection; }
    getFilterTrigger() { return this.filterTrigger; }
    getFilterContent() { return this.filterContent; }
    getFilterBox() { return this.filterBox; }
    getFilterOption() { return this.filterOption; }
    getAddFiltersText() { return this.addFiltersText; }
    getClearFiltersText() { return this.clearFiltersText; }
    getIssueTable() { return this.issueTable; }
    getTableBody() { return this.tableBody; }
    getCidColumn() { return this.cidColumn; }
    getStatusColumn() { return this.statusColumn; }
    getFirstDetectedColumn() { return this.firstDetectedColumn; }
    getOwnerColumn() { return this.ownerColumn; }
    getClassificationColumn() { return this.classificationColumn; }
    getSeverityColumn() { return this.severityColumn; }
    getActionColumn() { return this.actionColumn; }
    getComponentColumn() { return this.componentColumn; }
    getCategoryColumn() { return this.categoryColumn; }
    getFileColumn() { return this.fileColumn; }
    getFunctionColumn() { return this.functionColumn; }
    getCountColumn() { return this.countColumn; }
    getRecordCount() { return this.recordCount; }
    getPreviousPageButton() { return this.previousPageButton; }
    getNextPageButton() { return this.nextPageButton; }
    getEllipsisEnd() { return this.ellipsisEnd; }
    getPageSizeSelect() { return this.pageSizeSelect; }
    getSidebarSearchInput() { return this.sidebarSearchInput; }
    getExportMenu() { return this.exportMenu; }
    getColumnPanel() { return this.columnPanel; }
    getColumnMenuItemCheckbox() { return this.columnMenuItemCheckbox; }

    getPageButton(n) { return `page-button-${n}`; }
    getRowCell(rowIndex, colName) { return `row-${rowIndex}-${colName}-column`; }
    getRemoveFilterLabel(filterType) { return `Remove ${filterType} filter`; }
}

export default new IssueObject();
