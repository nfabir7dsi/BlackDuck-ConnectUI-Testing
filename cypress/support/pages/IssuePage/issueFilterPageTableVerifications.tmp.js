/**
 * TEMPORARY FILE — Table Result Verification Methods
 *
 * These methods are meant to be injected into the
 * "Table Result Verification" section of issueFilterPage.js.
 *
 * Each method is annotated with the filter(s) it is valid for.
 *
 * NOTE: "each row" checks only cover the rows visible on the current page.
 *       For multi-page results the table must be scrolled / paginated manually.
 *
 * NOTE: Column cell data-testids follow the pattern:
 *           row-{rowIndex}-{colName}-column
 *       e.g. row-0-cid-column, row-1-status-column
 *       The `$=` (ends-with) CSS selector is used to match any row index.
 */

import issueObject from '../../objects/IssueObjects/issueObject';

class IssueFilterPageTableVerifications {

// ─── Row Count ───────────────────────────────────────────────────────────────

// Valid for: ALL filters — confirm filter reduced / matched an exact number of rows
verifyRowCountEquals(count) {
    cy.getByDataTestId(issueObject.getIssueTable())
        .find('tbody tr').should('have.length', count);
    return this;
}

// Valid for: ALL filters — confirm filter reduced total results
verifyRowCountLessThan(count) {
    cy.getByDataTestId(issueObject.getIssueTable())
        .find('tbody tr').should('have.length.lessThan', count);
    return this;
}

// Valid for: ALL filters — confirm table has no rows (e.g. impossible filter combo)
verifyTableIsEmpty() {
    cy.getByDataTestId(issueObject.getIssueTable())
        .find('tbody tr').should('have.length', 0);
    return this;
}

// ─── CID Filter ──────────────────────────────────────────────────────────────

// Valid for: CID filter — exact match value
// Confirms at least one row with this CID is visible in the table
verifyTableContainsCid(cid) {
    cy.getByDataTestId(issueObject.getIssueTable())
        .find(`[data-testid$="${issueObject.getCidColumn()}"]`)
        .should('contain.text', String(cid));
    return this;
}

// Valid for: CID filter — exact match value
// All visible rows must have exactly this CID
verifyAllRowsHaveCid(cid) {
    cy.getByDataTestId(issueObject.getIssueTable())
        .find('tbody tr').each(($row) => {
            cy.wrap($row)
                .find(`[data-testid$="${issueObject.getCidColumn()}"]`)
                .should('have.text', String(cid));
        });
    return this;
}

// Valid for: CID filter — range (e.g. "10242-10244")
// All visible CIDs must be within [min, max] inclusive
verifyAllRowsCidInRange(min, max) {
    cy.getByDataTestId(issueObject.getIssueTable())
        .find(`[data-testid$="${issueObject.getCidColumn()}"]`).each(($cell) => {
            const cid = parseInt($cell.text().trim(), 10);
            expect(cid).to.be.at.least(min);
            expect(cid).to.be.at.most(max);
        });
    return this;
}

// Valid for: CID filter — greater-than (e.g. ">10240")
verifyAllRowsCidGreaterThan(value) {
    cy.getByDataTestId(issueObject.getIssueTable())
        .find(`[data-testid$="${issueObject.getCidColumn()}"]`).each(($cell) => {
            expect(parseInt($cell.text().trim(), 10)).to.be.greaterThan(value);
        });
    return this;
}

// Valid for: CID filter — less-than (e.g. "<10243")
verifyAllRowsCidLessThan(value) {
    cy.getByDataTestId(issueObject.getIssueTable())
        .find(`[data-testid$="${issueObject.getCidColumn()}"]`).each(($cell) => {
            expect(parseInt($cell.text().trim(), 10)).to.be.lessThan(value);
        });
    return this;
}

// ─── Classification Filter ───────────────────────────────────────────────────

// Valid for: Classification filter
// Single value: verifyAllRowsHaveClassification('Bug')
// Multiple selections (OR logic): verifyAllRowsHaveClassification('Bug', 'Intentional')
verifyAllRowsHaveClassification(...values) {
    const allowed = values.flat();
    cy.getByDataTestId(issueObject.getIssueTable())
        .find(`[data-testid$="${issueObject.getClassificationColumn()}"]`).each(($cell) => {
            expect(allowed).to.include($cell.text().trim());
        });
    return this;
}

// ─── Status Filter ───────────────────────────────────────────────────────────

// Valid for: Status filter
// Single value: verifyAllRowsHaveStatus('New')
// Multiple selections (OR logic): verifyAllRowsHaveStatus('New', 'Triaged')
verifyAllRowsHaveStatus(...values) {
    const allowed = values.flat();
    cy.getByDataTestId(issueObject.getIssueTable())
        .find(`[data-testid$="${issueObject.getStatusColumn()}"]`).each(($cell) => {
            expect(allowed).to.include($cell.text().trim());
        });
    return this;
}

// ─── Action Filter ───────────────────────────────────────────────────────────

// Valid for: Action filter
// Single value: verifyAllRowsHaveAction('Fix Required')
// Multiple selections (OR logic): verifyAllRowsHaveAction('Fix Required', 'Ignore')
verifyAllRowsHaveAction(...values) {
    const allowed = values.flat();
    cy.getByDataTestId(issueObject.getIssueTable())
        .find(`[data-testid$="${issueObject.getActionColumn()}"]`).each(($cell) => {
            expect(allowed).to.include($cell.text().trim());
        });
    return this;
}

// ─── Severity Filter ─────────────────────────────────────────────────────────

// Valid for: Severity filter
// Single value: verifyAllRowsHaveSeverity('Major')
// Multiple selections (OR logic): verifyAllRowsHaveSeverity('Major', 'Moderate')
verifyAllRowsHaveSeverity(...values) {
    const allowed = values.flat();
    cy.getByDataTestId(issueObject.getIssueTable())
        .find(`[data-testid$="${issueObject.getSeverityColumn()}"]`).each(($cell) => {
            expect(allowed).to.include($cell.text().trim());
        });
    return this;
}

// ─── Category Filter ─────────────────────────────────────────────────────────

// Valid for: Category filter — single selected category
verifyAllRowsHaveCategory(category) {
    cy.getByDataTestId(issueObject.getIssueTable())
        .find(`[data-testid$="${issueObject.getCategoryColumn()}"]`).each(($cell) => {
            cy.wrap($cell).should('contain.text', category);
        });
    return this;
}

// Valid for: Category filter — multiple selections (OR logic)
// verifyAllRowsHaveAnyCategory('Null pointer dereferences', 'Memory - corruptions')
verifyAllRowsHaveAnyCategory(...values) {
    const allowed = values.flat();
    cy.getByDataTestId(issueObject.getIssueTable())
        .find(`[data-testid$="${issueObject.getCategoryColumn()}"]`).each(($cell) => {
            const text = $cell.text().trim();
            expect(allowed.some(v => text.includes(v))).to.be.true;
        });
    return this;
}

// ─── File Filter ─────────────────────────────────────────────────────────────

// Valid for: File filter (wildcard text, e.g. "*.c", "src/*.cpp")
// Pass the literal fragment you expect to appear in each file path
verifyAllRowsContainFile(textFragment) {
    cy.getByDataTestId(issueObject.getIssueTable())
        .find(`[data-testid$="${issueObject.getFileColumn()}"]`).each(($cell) => {
            cy.wrap($cell).should('contain.text', textFragment);
        });
    return this;
}

// ─── Function Filter ─────────────────────────────────────────────────────────

// Valid for: Function filter (wildcard text)
verifyAllRowsContainFunction(textFragment) {
    cy.getByDataTestId(issueObject.getIssueTable())
        .find(`[data-testid$="${issueObject.getFunctionColumn()}"]`).each(($cell) => {
            cy.wrap($cell).should('contain.text', textFragment);
        });
    return this;
}

// ─── Owner Name Filter ───────────────────────────────────────────────────────

// Valid for: Owner Name filter (wildcard text)
verifyAllRowsHaveOwner(ownerFragment) {
    cy.getByDataTestId(issueObject.getIssueTable())
        .find(`[data-testid$="${issueObject.getOwnerColumn()}"]`).each(($cell) => {
            cy.wrap($cell).should('contain.text', ownerFragment);
        });
    return this;
}

// ─── CWE Filter ──────────────────────────────────────────────────────────────

// Valid for: CWE filter (single CWE ID, e.g. "476", "119")
verifyAllRowsHaveCwe(cweId) {
    cy.getByDataTestId(issueObject.getIssueTable())
        .find(`[data-testid$="${issueObject.getCweColumn()}"]`).each(($cell) => {
            cy.wrap($cell).should('contain.text', String(cweId));
        });
    return this;
}

// ─── Count Filter ────────────────────────────────────────────────────────────

// Valid for: Count filter — exact value
verifyAllRowsHaveCount(count) {
    cy.getByDataTestId(issueObject.getIssueTable())
        .find(`[data-testid$="${issueObject.getCountColumn()}"]`).each(($cell) => {
            cy.wrap($cell).should('have.text', String(count));
        });
    return this;
}

// Valid for: Count filter — greater-than (e.g. ">2")
verifyAllRowsHaveCountGreaterThan(value) {
    cy.getByDataTestId(issueObject.getIssueTable())
        .find(`[data-testid$="${issueObject.getCountColumn()}"]`).each(($cell) => {
            expect(parseInt($cell.text().trim(), 10)).to.be.greaterThan(value);
        });
    return this;
}

// Valid for: Count filter — less-than (e.g. "<5")
verifyAllRowsHaveCountLessThan(value) {
    cy.getByDataTestId(issueObject.getIssueTable())
        .find(`[data-testid$="${issueObject.getCountColumn()}"]`).each(($cell) => {
            expect(parseInt($cell.text().trim(), 10)).to.be.lessThan(value);
        });
    return this;
}

// Valid for: Count filter — range (e.g. "2-5")
verifyAllRowsHaveCountInRange(min, max) {
    cy.getByDataTestId(issueObject.getIssueTable())
        .find(`[data-testid$="${issueObject.getCountColumn()}"]`).each(($cell) => {
            const count = parseInt($cell.text().trim(), 10);
            expect(count).to.be.at.least(min);
            expect(count).to.be.at.most(max);
        });
    return this;
}

// ─── First Detected Filter ───────────────────────────────────────────────────
// NOTE: These rely on the displayed date text being parseable by `new Date()`.
//       If the app displays a locale-specific format you may need to adjust the parsing.

// Valid for: First Detected filter — After mode
// dateStr: "YYYY-MM-DD" — every visible first-detected date must be >= this date
verifyAllRowsFirstDetectedAfter(dateStr) {
    const cutoff = new Date(dateStr);
    cy.getByDataTestId(issueObject.getIssueTable())
        .find(`[data-testid$="${issueObject.getFirstDetectedColumn()}"]`).each(($cell) => {
            expect(new Date($cell.text().trim())).to.be.gte(cutoff);
        });
    return this;
}

// Valid for: First Detected filter — Before mode
// dateStr: "YYYY-MM-DD" — every visible first-detected date must be <= this date
verifyAllRowsFirstDetectedBefore(dateStr) {
    const cutoff = new Date(dateStr);
    cy.getByDataTestId(issueObject.getIssueTable())
        .find(`[data-testid$="${issueObject.getFirstDetectedColumn()}"]`).each(($cell) => {
            expect(new Date($cell.text().trim())).to.be.lte(cutoff);
        });
    return this;
}

// Valid for: First Detected filter — In the range mode
// Both dateStr values: "YYYY-MM-DD"
verifyAllRowsFirstDetectedInRange(fromDateStr, toDateStr) {
    const from = new Date(fromDateStr);
    const to   = new Date(toDateStr);
    cy.getByDataTestId(issueObject.getIssueTable())
        .find(`[data-testid$="${issueObject.getFirstDetectedColumn()}"]`).each(($cell) => {
            const d = new Date($cell.text().trim());
            expect(d).to.be.gte(from);
            expect(d).to.be.lte(to);
        });
    return this;
}

// ─── Filters Without a Dedicated Table Column ────────────────────────────────
// The filters below do not have a directly visible column in the default table
// view.  The recommended verification pattern for these is:
//   1. Confirm the filter chip is active (via verifyFilterChipVisible / verifyChipLabelContains)
//   2. Confirm the table has results (or is empty when expected)
//   3. Optionally compare row counts before and after filtering

// Valid for: Checker filter
// No dedicated column — verify chip label and results
verifyCheckerFilterActive(checkerName) {
    this.verifyChipLabelContains('Checker', checkerName);
    this.verifyTableHasResults();
    return this;
}

// Valid for: Type filter
verifyTypeFilterActive(typeName) {
    this.verifyChipLabelContains('Type', typeName);
    this.verifyTableHasResults();
    return this;
}

// Valid for: Impact filter  (High / Medium / Low / Audit)
verifyImpactFilterActive(impactValue) {
    this.verifyChipLabelContains('Impact', impactValue);
    this.verifyTableHasResults();
    return this;
}

// Valid for: Issue Kind filter  (Quality / Security)
verifyIssueKindFilterActive(kindValue) {
    this.verifyChipLabelContains('Issue Kind', kindValue);
    this.verifyTableHasResults();
    return this;
}

// Valid for: Legacy filter  (True / False / Various)
verifyLegacyFilterActive(legacyValue) {
    this.verifyChipLabelContains('Legacy', legacyValue);
    this.verifyTableHasResults();
    return this;
}

// Valid for: Fix Target filter  (Untargeted / Fresno / Gilroy / etc.)
verifyFixTargetFilterActive(targetValue) {
    this.verifyChipLabelContains('Fix Target', targetValue);
    this.verifyTableHasResults();
    return this;
}

// Valid for: Comparison filter  (Present / Absent)
verifyComparisonFilterActive(option) {
    this.verifyChipLabelContains('Comparison', option);
    return this;
}

// Valid for: Streams filter  (include / exclude stream names)
verifyStreamsFilterActive() {
    this.verifyFilterChipVisible('Streams');
    this.verifyTableHasResults();
    return this;
}

// Valid for: Standard filters  (CERT C / OWASP / MISRA / CWE Top 25)
// standardName: e.g. 'CERT C', 'OWASP Web Top Ten 2021'
verifyStandardFilterActive(standardName) {
    this.verifyFilterChipVisible(standardName);
    this.verifyTableHasResults();
    return this;
}

// Valid for: External Reference / Merge Key / Merge Extra / Function Merge Name
// (wildcard text filters with no visible table column)
verifyTextFilterActive(filterType) {
    this.verifyFilterChipVisible(filterType);
    this.verifyTableHasResults();
    return this;
}

}

export default new IssueFilterPageTableVerifications();