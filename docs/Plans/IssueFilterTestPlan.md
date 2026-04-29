# Issue Page Filter — Full Exploration & Test Plan

## All 67 Filter Options Categorized by UI Behavior

---

### TYPE A — Multi-select Enum (9 filters)

Searchable dropdown with checkboxes, small fixed set of values pre-loaded.

| Filter | Options |
|--------|---------|
| **Classification** | Unclassified, Pending, False Positive, Intentional, Bug, Various |
| **Status** | New, Triaged, Dismissed, Fixed, Absent Dismissed |
| **Action** | Undecided, Fix Required, Fix Submitted, Modeling Required, Ignore, Various |
| **Severity** | Unspecified, Major, Moderate, Minor, Various |
| **Impact** | High, Medium, Low, Audit |
| **Language** | C, C#, C++, Dart, Fortran, Go, HTML, JSX, Java, JavaScript, PHP, Python 3, Ruby, Scala, Swift, Text, TypeScript, Visual Basic |
| **Issue Kind** | Quality, Security |
| **Legacy** | False, True, Various |
| **Fix Target** | Untargeted, Fresno, Gilroy, Harmony, Indio, Future, Various |

---

### TYPE B — Searchable Multi-select, Large Pre-loaded List (3 filters)

Searchable listbox with hundreds of items already loaded; filter narrows by typing.

- **Checker** (e.g. `ALLOC_FREE_MISMATCH`, `NULL_RETURNS`, …)
- **Category** (e.g. `API usage errors`, `Array access before checking the index`, …)
- **Type** (hundreds of issue type descriptions)

---

### TYPE C — Search-to-Fetch Multi-select (40 filters)

All `Standard:` filters. Dialog shows _"Search to get suggestions"_ — must type to query the server. Returns matching compliance IDs (e.g. `EXP30-C`, `CWE-79`).

| Group | Standards |
|-------|-----------|
| CWE Top 25 | 2019, 2021, 2022, 2023 |
| AUTOSAR | AUTOSAR C++14 |
| CERT | CERT C, CERT C++, CERT JAVA |
| DISA-STIG | Severity, V4R3, V4R10, V4R10 Vul ID, V5, V5 Vul ID |
| Hyundai | Coding Standard C/C++/Java (base + 4.1 variants), Cost of Implementation, Likelihood, Severity |
| ISO | ISO TS17961 2016 |
| MISRA C | 2004, 2012, 2023, 2025 |
| MISRA C++ | 2008, 2023 |
| MISRA/AUTOSAR | MISRA/AUTOSAR Category |
| OWASP Mobile | 2016, 2024 |
| OWASP Web | 2017, 2021, 2025 |
| PCI | PCI DSS 2018 |

---

### TYPE D — Numeric Range Input (3 filters)

Single text field. Accepts: `N`, `N-M` (range), `<N`, `>N`.

- **CID**, **Count**, **Score**

---

### TYPE E — CWE ID Input (1 filter)

Single text field labeled _"Enter CWE ID"_.

- **CWE**

---

### TYPE F — Wildcard Text Input (7 filters)

Single text field with hint `* - any word, ? - any char`.

- **File**, **Function**, **Owner Name**, **External Reference**, **Merge Key**, **Merge Extra**, **Function Merge Name**

---

### TYPE G — Date Filter (2 filters)

Radio group with 6 operator modes:

| Mode | UI Controls |
|------|-------------|
| In the last / Not in the last | Number spinbutton + time unit dropdown (days / weeks / months) |
| In the range / Exclude | From date picker + To date picker |
| After / Before | Single date picker |

Filters: **First Detected**, **Last Triaged**

---

### TYPE H — Binary Radio Filter (1 filter)

Radio group with exactly 2 options + an explanatory note about snapshot comparison context.

- **Comparison** → `Present` / `Absent`

---

### TYPE I — Dual-search Streams Filter (1 filter)

Unique UI: two separate search inputs — one to include streams, one to exclude streams.

- **Streams** → _"Display issues that occur in any of: [search]"_ + _"But not issues that occur in any of: [search]"_

---

## Comprehensive Test Plan

> **Note:** The project `nonCommitCase-2-multistream` only has 4 issues, which limits verifying row count changes from filters. For result-verification tests use a data-rich project — **Defector** or **testcpp-multistream** are recommended.

---

### Suite 1 — Filter Toolbar & Chip Management

**Already covered by `issueFilterTest.cy.js`:** chip count on load, chip visibility (Classification, Impact, Severity), Add filters button, Clear filters button, remove chip via X, clear all filters, clicking chip opens dialog, Add filters dropdown lists options.

**New tests to add:**

1. After removing a chip, the same filter can be re-added via "Add filters"
2. Chip label reflects no values when filter added but nothing selected (shows `=`)
3. Chip label updates to show selected value(s) after selection
4. Multiple chips of different types can coexist in the toolbar
5. Filter chips appear in the order they were added
6. "Clear filters" button disappears after all filters are cleared

---

### Suite 2 — Type A: Multi-select Enum Filters

**Full coverage on Classification; spot-check Status, Action, Severity, Impact, Issue Kind, Language, Legacy, Fix Target.**

For **each** Type A filter:

1. Opening dialog shows correct options list with checkboxes
2. All expected option values are present (verify against known list above)
3. Selecting one option → chip label updates to `FilterName = Value` → table row count changes
4. Selecting multiple options → table shows rows matching **any** selected value (OR logic)
5. Typing in the search box narrows the options list
6. Deselecting all options → chip shows empty state → no filter applied
7. Pressing `Escape` closes dialog without applying changes
8. Clicking outside dialog closes it

---

### Suite 3 — Type B: Searchable Large-list Multi-select

**Filters: Checker, Category, Type**

For each:

1. Opening dialog shows options list pre-loaded (count > 0 without typing)
2. Typing in search narrows the list to matching items only
3. Clearing search restores full list
4. Selecting one option → chip label updates → table filters
5. Selecting multiple options → OR logic in table results
6. Special catch-all value (e.g. `$checker$`) is present and selectable
7. Selected items show checkmarks; deselecting removes the checkmark

---

### Suite 4 — Type C: Standard Filters (Search-to-Fetch)

**Test one representative per standard family — not all 40 individually.**

Representative: `Standard: CERT C`, `Standard: OWASP Web Top Ten 2021`, `Standard: MISRA C 2012`, `Standard: 2023 CWE Top 25`

For each representative:

1. Opening dialog shows empty listbox with _"Search to get suggestions"_ message
2. Without typing, no options are visible
3. Typing a valid prefix (e.g. `EXP`) → matching identifiers appear
4. Selecting an identifier → chip shows standard name → table filters
5. Clearing search field → results clear, back to empty state
6. Selecting multiple identifiers → OR logic in table

---

### Suite 5 — Type D: Numeric Range Filters

**Filters: CID, Count, Score**

For each:

1. Opening dialog shows text input with placeholder `Number or range: 1 or 2-5 or <4 or >6`
2. Entering an exact number → chip shows `= N` → table shows matching row(s)
3. Entering a range (e.g. `10242-10244`) → chip shows range → table shows only rows in range
4. Entering `<N` → table shows only rows where value < N
5. Entering `>N` → table shows only rows where value > N
6. Entering invalid text (e.g. letters) → expected behavior (error or no-op)
7. Clearing input → chip shows empty state → no filter applied

---

### Suite 6 — Type E: CWE ID Filter

1. Opening dialog shows text input labeled _"Enter CWE ID"_
2. Entering a known CWE ID → chip label updates → table filters to issues with that CWE
3. Entering invalid / non-numeric input → expected behavior
4. Clearing input → filter removed

---

### Suite 7 — Type F: Wildcard Text Filters

**Filters: File, Function, Owner Name, External Reference, Merge Key, Merge Extra, Function Merge Name**

For each:

1. Opening dialog shows text input with hint `* - any word, ? - any char`
2. Entering exact text → chip shows text → table filters to matching rows
3. Entering `*` wildcard → broad match across all values in that column
4. Entering `?` wildcard → single-character substitution match
5. Entering text with no matches → table shows zero results
6. Clearing input → chip removed → all rows restored

---

### Suite 8 — Type G: Date Filters

**Filters: First Detected, Last Triaged**

For each filter, test all 6 operator modes:

**"In the last" / "Not in the last":**

1. Dialog shows number spinbutton + time unit dropdown (days / weeks / months)
2. Enter N=30, unit=days → chip shows `in the last 30 days` → table filters to recent issues
3. `Not in the last` → inverse: shows issues older than 30 days
4. Change time unit to weeks/months → chip label updates accordingly

**"In the range" / "Exclude":**

5. Dialog shows From + To date pickers
6. Select a From and To date → chip shows date range → table filters
7. `Exclude` with same range → inverse: shows issues outside that range

**"After" / "Before":**

8. Dialog shows single date picker
9. Select a date → chip shows `after [date]` → table shows only newer issues
10. `Before` → table shows only older issues

---

### Suite 9 — Type H: Comparison Filter

1. Opening dialog shows `Present` and `Absent` radio buttons
2. Explanatory note is visible: _"'Comparison' indicates whether an issue is present in the snapshot(s) specified in this view's 'compare to' field in the Snapshot Scope."_
3. Selecting `Present` → chip updates → table filtered to comparison issues
4. Selecting `Absent` → chip updates → inverse filter applied
5. Only one option can be selected at a time (radio, not checkbox)

---

### Suite 10 — Type I: Streams Filter

1. Opening dialog shows two sections: include streams search + exclude streams search
2. Searching in the include section returns matching streams
3. Selecting a stream to include → chip updated → table shows only issues in that stream
4. Searching in the exclude section returns streams
5. Selecting a stream to exclude → issues from that stream removed from results
6. Include and exclude set simultaneously → combined logic applied
7. Clearing include / exclude → filter reset

---

### Suite 11 — Multi-filter Combinations

1. Apply 2 filters (e.g. Classification + Status) → results narrowed by AND logic between filters
2. Apply 3 filters simultaneously → cumulative AND narrowing
3. Remove one filter from a combination → results expand appropriately
4. Apply a filter that yields zero results, then add another → still zero results
5. Two values within the same filter (e.g. Status = New + Dismissed) → OR logic within filter
6. "Clear filters" when multiple filters are active removes all at once

---

### Suite 12 — Filter State & URL Persistence

1. Apply a filter → URL query params update to encode the filter state
2. Reload the page with filter params in URL → filters are restored
3. Navigate to another page and back → filters preserved in session
4. Sharing the URL (open in new tab) → same filters loaded

---

### Suite 13 — Filter Chip Editing

1. Clicking an active chip body re-opens the filter dialog with current selection pre-populated
2. Modifying selection in re-opened dialog → chip label updates to new value
3. Pressing `Escape` on a re-opened dialog → original selection preserved (no change)

---

## File Organization

```
cypress/e2e/Test Suites/Issues/Issue Page Filter/
  issueFilterToolbarTest.cy.js    ← Suite 1  (toolbar & chip management)
  issueFilterEnumTest.cy.js       ← Suite 2  (Type A — enum filters)
  issueFilterSearchTest.cy.js     ← Suite 3+4 (Type B & C — large list / standard filters)
  issueFilterNumericTest.cy.js    ← Suite 5+6 (Type D & E — numeric / CWE)
  issueFilterTextTest.cy.js       ← Suite 7  (Type F — wildcard text)
  issueFilterDateTest.cy.js       ← Suite 8  (Type G — date filters)
  issueFilterSpecialTest.cy.js    ← Suite 9+10 (Type H & I — Comparison / Streams)
  issueFilterCombinedTest.cy.js   ← Suite 11+12+13 (multi-filter, persistence, editing)

cypress/support/objects/IssueObjects/
  issueObject.js                  ← shared page locators (filtersSection, filterTrigger, clearFiltersText kept here)
  issueFilterObject.js            ← filter-specific locators (filterBox, filterOption, addFiltersText, etc.)

cypress/support/pages/IssuePage/
  issuePage.js                    ← shared page actions (clearFiltersIfPresent kept here)
  issueFilterPage.js              ← filter-specific actions (chip verification, add/clear/remove/open filter)
```
