class IssueFilterObject {
    // Filter dialog
    filterSelectorGroup = 'filter-selector-group';
    filterContent = 'filter-content';
    filterTrigger = 'filter-trigger';
    filterBox = '[role="listbox"]';
    filterOption = '[role="option"]';
    addFiltersText = 'Add filters';
    clearFilterButton = 'filters-new-clear-button';
    streamOptionsSelector = '[data-testid="filter-content"] button[role="combobox"]'; 
    streamOptions = 'body > div:last-of-type [role="option"]'; 
    streamSection = `[data-testid="${this.filterContent}"] div[cmdk-root]`;

    // Type A enum filter expected options
    classificationOptions = ['Unclassified', 'Pending', 'False Positive', 'Intentional', 'Bug', 'Various'];
    statusOptions = ['New', 'Triaged', 'Dismissed', 'Fixed', 'Absent Dismissed'];
    actionOptions = ['Undecided', 'Fix Required', 'Fix Submitted', 'Modeling Required', 'Ignore', 'Various'];
    severityOptions = ['Unspecified', 'Major', 'Moderate', 'Minor', 'Various'];
    impactOptions = ['High', 'Medium', 'Low', 'Audit'];
    issueKindOptions = ['Quality', 'Security'];
    legacyOptions = ['False', 'True', 'Various'];
    fixTargetOptions = ['Untargeted', 'Fresno', 'Gilroy', 'Harmony', 'Indio', 'Future', 'Various'];

    getFilterSelectorGroup() { return this.filterSelectorGroup; }
    getFilterContent() { return this.filterContent; }
    getFilterTrigger() { return this.filterTrigger; }
    getFilterBox() { return this.filterBox; }
    getFilterOption() { return this.filterOption; }
    getAddFiltersText() { return this.addFiltersText; }
    getClearFilterButton() { return this.clearFilterButton; }

    getRemoveFilterLabel(filterType) { return `Remove ${filterType} filter`; }

    getClassificationOptions() { return this.classificationOptions; }
    getStatusOptions() { return this.statusOptions; }
    getActionOptions() { return this.actionOptions; }
    getSeverityOptions() { return this.severityOptions; }
    getImpactOptions() { return this.impactOptions; }
    getIssueKindOptions() { return this.issueKindOptions; }
    getLegacyOptions() { return this.legacyOptions; }
    getFixTargetOptions() { return this.fixTargetOptions; }

    getStreamOptionsSelector() { return this.streamOptionsSelector; }
    getStreamOptions() { return this.streamOptions; }
    getStreamSection() { return this.streamSection; }
}

export default new IssueFilterObject();
