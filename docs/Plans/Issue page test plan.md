# Issue List Page — Test Plan

## Page Overview

Accessed by navigating: **Projects list → click a project → Issue List page**

URL structure:
```
/ui/projects/{project-name}/{id}?offset=0&rowCount=25&sortColumn=cid&sortOrder=desc&queryType=bySnapshot&filters=...
```

The page contains: breadcrumb nav, project title, project tabs, issue list controls bar (view selector, save/reset, AI banner), filter chips toolbar, a virtualized data table with 13 columns, and a pagination footer.

---

## Implementation Files

| File | Purpose |
|------|---------|
| `cypress/support/objects/IssueObjects/issueObject.js` | Selectors-only class |
| `cypress/support/pages/IssuePage/issuePage.js` | Interaction/assertion methods |
| `cypress/e2e/Test Suites/Issues/issuePageTest.cy.js` | Suites 1–3, 5, 10, 11 |
| `cypress/e2e/Test Suites/Issues/issueListTableTest.cy.js` | Suites 6 (partial), 7, 8, 9 |
| `cypress/e2e/Test Suites/Issues/issueFilterTest.cy.js` | Suite 4 |

---

## Suite 1 — Page Load & Navigation

*Setup: login → sidebar Projects → click "200 snapshots project"*

| # | Test | Key Assertion |
|---|------|---------------|
| 1.1 | Navigating to a project loads the issue list | URL includes `/ui/projects/` |
| 1.2 | Page title displays the project name | `[data-testid="page-title"]` = "200 snapshots project" |
| 1.3 | Issues tab is active by default | `[data-testid="tabs-trigger-nav.tab.projects.defects"]` has `aria-selected="true"` |
| 1.4 | Page header section is visible | `[data-testid="page-header"]` is visible |

---

## Suite 2 — Breadcrumb Navigation

| # | Test | Key Assertion |
|---|------|---------------|
| 2.1 | Breadcrumb nav is visible | `[data-testid="breadcrumb-nav"]` is visible |
| 2.2 | "Projects" breadcrumb link is visible | `[data-testid="breadcrumb-link-Projects"]` is visible |
| 2.3 | Clicking "Projects" breadcrumb navigates back to projects list | URL includes `/ui/projects` but not `/ui/projects/` |
| 2.4 | Project switcher combobox is visible in the breadcrumb | `[data-testid="autocomplete-search-box"]` is visible |

---

## Suite 3 — Issue List Controls Bar

| # | Test | Key Assertion |
|---|------|---------------|
| 3.1 | Controls bar is visible | `[data-testid="issueList-controls"]` is visible |
| 3.2 | View selector is visible with a label | `[data-testid="project-list-view-select-trigger"]` is visible and non-empty |
| 3.3 | Save button is visible | `[data-testid="save-button"]` is visible |
| 3.4 | Reset changes button is visible | `[data-testid="reset-changes-button"]` is visible |
| 3.5 | AI Assist banner is visible | Contains text "Let AI assist with triaging issues!" |

---

## Suite 4 — Filter Chips Toolbar *(issueFilterTest)*

| # | Test | Key Assertion |
|---|------|---------------|
| 4.1 | Three default filter chips are present | 3 `[data-testid="filter-trigger"]` chips visible |
| 4.2 | Classification filter chip is visible | Chip text contains "Classification" |
| 4.3 | Impact filter chip is visible | Chip text contains "Impact" |
| 4.4 | Severity filter chip is visible | Chip text contains "Severity" |
| 4.5 | "Add filters" button is visible | Button "Add filters" visible in filters section |
| 4.6 | "Clear filters" button is visible when filters active | Button "Clear filters" visible in filters section |
| 4.7 | Removing Classification filter removes that chip | Click `[aria-label="Remove Classification filter"]` → chip gone |
| 4.8 | Clearing all filters removes all chips | Click "Clear filters" → no `filter-trigger` elements |
| 4.9 | Clicking filter chip body opens an edit dialog | Chip click → `[role="dialog"]` appears |
| 4.10 | "Add filters" dropdown shows filter options | Click "Add filters" → `[role="listbox"]` with options appears |

---

## Suite 5 — Actions Bar (Export & Column Visibility)

| # | Test | Key Assertion |
|---|------|---------------|
| 5.1 | Export button is visible | `[data-testid="export-menu-button"]` is visible |
| 5.2 | Clicking export button opens a menu | Dropdown/menu appears after click |
| 5.3 | Column visibility toggle is visible | `[data-testid="view-options-trigger"]` is visible |
| 5.4 | Clicking column toggle opens a panel | A panel with column options appears |
| 5.5 | Toggling a column off hides it from the table | "Owner" column header no longer in DOM |
| 5.6 | Toggling the column back on restores it | "Owner" column header is visible again |

---

## Suite 6 — Issue Table Structure *(issueListTableTest, partial)*

*Tests 6.5–6.13 (individual mid-column headers) are excluded.*

| # | Test | Key Assertion |
|---|------|---------------|
| 6.1 | Issue table is visible | `[data-testid="issue-list-table"]` is visible |
| 6.2 | Table body renders rows | `[data-testid="row-0"]` exists |
| 6.3 | CID column header is visible | `[data-testid="cid-column"]` is visible |
| 6.4 | Status column header is visible | `[data-testid="status-column"]` is visible |
| 6.5 | Count column header is visible | `[data-testid="occurrenceCount-column"]` is visible |
| 6.6 | First row cells contain data | `row-0-cid-column`, `row-0-status-column`, `row-0-classification-column` are non-empty |
| 6.7 | Select-all checkbox is present | `[data-testid="select-row"][aria-label="Select all rows"]` is visible |

---

## Suite 7 — Column Sorting *(issueListTableTest)*

| # | Test | Key Assertion |
|---|------|---------------|
| 7.1 | Default sort is CID descending | URL contains `sortColumn=cid` and `sortOrder=desc` |
| 7.2 | Clicking CID column toggles sort direction | URL `sortOrder` changes to `asc` |
| 7.3 | Clicking Status column sorts by status | URL contains `sortColumn=status` |
| 7.4 | Clicking First Detected column sorts by date | URL contains `sortColumn=firstDetected` |
| 7.5 | Clicking Severity column sorts by severity | URL contains `sortColumn=severity` |
| 7.6 | Clicking Classification column sorts | URL contains `sortColumn=classification` |

---

## Suite 8 — Row Selection *(issueListTableTest)*

| # | Test | Key Assertion |
|---|------|---------------|
| 8.1 | Individual row checkbox selects a row | `row-0` checkbox `aria-checked="true"` |
| 8.2 | Select-all checkbox selects all visible rows | All row checkboxes `aria-checked="true"` |
| 8.3 | Clicking select-all again deselects all rows | All row checkboxes `aria-checked="false"` |
| 8.4 | Deselecting a row after select-all changes select-all state | Select-all is no longer `aria-checked="true"` |

---

## Suite 9 — Issue Detail Navigation *(issueListTableTest, last)*

| # | Test | Key Assertion |
|---|------|---------------|
| 9.1 | Clicking a row navigates to the issue detail page | URL changes to include the issue CID |
| 9.2 | Browser back returns to the issue list | URL returns to `/ui/projects/`, issue table visible |

---

## Suite 10 — Sidebar CID Search

| # | Test | Key Assertion |
|---|------|---------------|
| 10.1 | Sidebar CID search input is visible | `[data-testid="search-input-sidebar"]` is visible |
| 10.2 | Typing in sidebar search accepts input | Input value reflects typed CID |
| 10.3 | Clearing the sidebar search restores normal state | Input is empty, table is visible |

---

## Suite 11 — Pagination

| # | Test | Key Assertion |
|---|------|---------------|
| 11.1 | Record count is displayed | `[data-testid="record-count"]` contains "1-25 of" |
| 11.2 | Previous page button is disabled on page 1 | `[data-testid="previous-page-button"]` is disabled |
| 11.3 | Next page button is enabled on page 1 | `[data-testid="next-page-button"]` is not disabled |
| 11.4 | Ellipsis button is visible for large result sets | `[data-testid="ellipsis-button-end"]` is visible |
| 11.5 | Page size selector shows "25" by default | `[data-testid="page-size-select"]` contains "25" |
| 11.6 | Clicking Next navigates to page 2 | Record count shows "26-50 of"; page-button-2 active |
| 11.7 | Clicking Previous from page 2 returns to page 1 | Record count shows "1-25 of"; page-button-1 active |
| 11.8 | Clicking a specific page number navigates there | page-button-3 click → count shows "51-75 of" |
| 11.9 | Changing page size updates the record count | Select 50 → record count shows "1-50 of" |
| 11.10 | Changing page size resets to page 1 | page-button-1 is active after size change |

---

## Key data-testid Reference

```
// Breadcrumb
breadcrumb-nav, breadcrumb-link-Projects, autocomplete-search-box

// Page structure
page-header, page-title
tabs-trigger-nav.tab.projects.defects

// Controls bar
issueList-controls, project-list-view-select-trigger, save-button, reset-changes-button

// Actions
export-menu-button, view-options-trigger

// Filters
filters-section, filter-trigger, filter-content
[aria-label="Remove {Type} filter"]

// Table
issue-list-table, record-list-table-body
cid-column, status-column, firstDetected-column, owner-column, classification-column
severity-column, action-column, displayComponent-column, displayCategory-column
displayFile-column, displayFunction-column, occurrenceCount-column
[data-testid="select-row"][aria-label="Select all rows"]
row-{n}, row-{n}-{col}-column

// Pagination
record-count, previous-page-button, next-page-button
page-button-{n}, ellipsis-button-end, page-size-select

// Sidebar search
search-input-sidebar, search-sidebar-expanded
```
