import sidebar from '../../../../support/pages/Sidebar/sidebar';
import issuePage from '../../../../support/pages/IssuePage/issuePage';
import issueFilterPage from '../../../../support/pages/IssuePage/issueFilterPage';
import issueFilterObject from '../../../../support/objects/IssueObjects/issueFilterObject';
import loginObjects from '../../../../support/objects/LoginObjects/loginObjects';

describe('Issue Filter — Searchable Large-list & Standard Filters', { testIsolation: false }, () => {
    let data;

    before(() => {
        cy.fixture('coverity').then((fixture) => {
            data = fixture;
            cy.visit(data.baseURL);
            cy.waitTillVisible(loginObjects.getLoginPageHeader());
            cy.login(data.validUser.username, data.validUser.password);
        });
        sidebar.clickOnProjectsMenu()
            .clickOnProjectsTab()
            .clearFiltersIfPresent()
            .clickFirstProjectLink()
            .clearFiltersIfPresent();
    });

    after(() => {
        cy.logout();
    });

    // ═══════════════════════════════════════════════════════════════════════
    // Suite 3 — Type B: Searchable Large-list Multi-select
    // ═══════════════════════════════════════════════════════════════════════

    // ── Checker ───────────────────────────────────────────────────────────

    describe('Checker filter (Type B)', () => {

        it('Opening Checker dialog shows pre-loaded options', () => {
            issueFilterPage.addFilter('Checker');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyOptionCountGreaterThan(5);
        });

        it('Typing in search narrows the list to matching items', () => {
            issueFilterPage.searchInDialog('NULL');
            issueFilterPage.verifyOptionCountGreaterThan(0);
        });

        it('Clearing search restores the full list', () => {
            issueFilterPage.clearSearchInDialog();
            issueFilterPage.verifyOptionCountGreaterThan(5);
        });

        it('Selecting one option updates chip label', () => {
            issueFilterPage.searchInDialog('NULL_RETURNS');
            issueFilterPage.selectOption('NULL_RETURNS');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Checker', 'NULL_RETURNS');
        });

        it('Table shows filtered results after selection', () => {
            issueFilterPage.verifyTableHasResults();
        });

        it('Selecting multiple options applies OR logic', () => {
            issueFilterPage.clickFilterChip('Checker');
            issueFilterPage.searchInDialog('FORWARD_NULL');
            issueFilterPage.selectOption('FORWARD_NULL');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyTableHasResults();
        });

        it('Cleanup: remove Checker filter', () => {
            issueFilterPage.removeFilter('Checker');
        });
    });

    // ── Category ──────────────────────────────────────────────────────────

    describe('Category filter (Type B)', () => {

        it('Opening Category dialog shows pre-loaded options', () => {
            issueFilterPage.addFilter('Category');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyOptionCountGreaterThan(5);
        });

        it('Typing in search narrows the list', () => {
            issueFilterPage.searchInDialog('Null');
            issueFilterPage.verifyOptionCountGreaterThan(0);
        });

        it('Selecting an option updates the chip label', () => {
            issueFilterPage.selectOption('Null pointer dereferences');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Category', 'Null pointer dereferences');
            issueFilterPage.verifyTableHasResults();
        });

        it('Cleanup: remove Category filter', () => {
            issueFilterPage.removeFilter('Category');
        });
    });

    // ── Type ──────────────────────────────────────────────────────────────

    describe('Type filter (Type B)', () => {

        it('Opening Type dialog shows pre-loaded options', () => {
            issueFilterPage.addFilter('Type');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyOptionCountGreaterThan(5);
        });

        it('Typing in search narrows the list', () => {
            issueFilterPage.searchInDialog('Dereference');
            issueFilterPage.verifyOptionCountGreaterThan(0);
        });

        it('Clearing search restores the full list', () => {
            issueFilterPage.clearSearchInDialog();
            issueFilterPage.verifyOptionCountGreaterThan(5);
        });

        it('Selecting an option updates the chip label and filters table', () => {
            issueFilterPage.searchInDialog('Dereference');
            issueFilterPage.selectOption('Dereference');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Type', 'Dereference');
            issueFilterPage.verifyTableHasResults();
        });

        it('Cleanup: remove Type filter', () => {
            issueFilterPage.removeFilter('Type');
        });
    });

    // ═══════════════════════════════════════════════════════════════════════
    // Suite 4 — Type C: Standard Filters (Search-to-Fetch)
    // ═══════════════════════════════════════════════════════════════════════

    // ── Standard: CERT C ──────────────────────────────────────────────────

    describe('Standard: CERT C filter (Type C)', () => {

        it('Opening dialog shows "Search to get suggestions" message', () => {
            issueFilterPage.addFilter('Standard: CERT C');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyFilterDialogContains('Search to get suggestions');
        });

        it('Without typing, no options are visible', () => {
            issueFilterPage.verifyOptionCount(0);
        });

        it('Typing a valid prefix shows matching identifiers', () => {
            issueFilterPage.searchInDialog('EXP');
            issueFilterPage.verifyOptionCountGreaterThan(0);
        });

        it('Selecting an identifier updates chip and filters table', () => {
            issueFilterPage.selectOption('EXP30-C');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Standard: CERT C', 'EXP30-C');
            issueFilterPage.verifyTableHasResults();
        });

        it('Cleanup: remove Standard: CERT C filter', () => {
            issueFilterPage.removeFilter('Standard: CERT C');
        });
    });

    // ── Standard: OWASP Web Top Ten 2021 ──────────────────────────────────

    describe('Standard: OWASP Web Top Ten 2021 filter (Type C)', () => {

        it('Opening dialog shows search-to-fetch message', () => {
            issueFilterPage.addFilter('Standard: OWASP Web Top Ten 2021');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyFilterDialogContains('Search to get suggestions');
        });

        it('Without typing, no options are visible', () => {
            issueFilterPage.verifyOptionCount(0);
        });

        it('Typing a prefix shows matching identifiers', () => {
            issueFilterPage.searchInDialog('A10');
            issueFilterPage.verifyOptionCountGreaterThan(0);
        });

        it('Selecting an identifier updates the chip', () => {
            issueFilterPage.selectOption('A10');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Standard: OWASP Web Top Ten 2021', 'A10');
        });

        it('Cleanup: remove OWASP filter', () => {
            issueFilterPage.removeFilter('Standard: OWASP Web Top Ten 2021');
        });
    });

    // ── Standard: MISRA C 2012 ────────────────────────────────────────────

    describe('Standard: MISRA C 2012 filter (Type C)', () => {

        it('Opening dialog shows search-to-fetch message', () => {
            issueFilterPage.addFilter('Standard: MISRA C 2012');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyFilterDialogContains('Search to get suggestions');
        });

        it('Typing a prefix shows matching rules', () => {
            issueFilterPage.searchInDialog('Rule');
            issueFilterPage.verifyOptionCountGreaterThan(0);
        });

        it('Selecting a rule updates the chip', () => {
            issueFilterPage.selectNthOption(1);
            issueFilterPage.closeDialog();
            issueFilterPage.verifyFilterChipVisible('Standard: MISRA C 2012');
        });

        it('Cleanup: remove MISRA C 2012 filter', () => {
            issueFilterPage.removeFilter('Standard: MISRA C 2012');
        });
    });

    // ── Standard: 2023 CWE Top 25 ─────────────────────────────────────────

    describe('Standard: 2023 CWE Top 25 filter (Type C)', () => {

        it('Opening dialog shows search-to-fetch message', () => {
            issueFilterPage.addFilter('Standard: 2023 CWE Top 25');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyFilterDialogContains('Search to get suggestions');
        });

        it('Typing shows matching CWE identifiers', () => {
            issueFilterPage.searchInDialog('Rank');
            issueFilterPage.verifyOptionCountGreaterThan(0);
        });

        it('Selecting multiple identifiers applies OR logic', () => {
            issueFilterPage.selectNthOption(1);
            issueFilterPage.searchInDialog('Rank');
            issueFilterPage.selectNthOption(2);
            issueFilterPage.closeDialog();
            issueFilterPage.verifyFilterChipVisible('Standard: 2023 CWE Top 25');
        });

        it('Clearing search field returns to empty state', () => {
            issueFilterPage.clickFilterChip('Standard: 2023 CWE Top 25');
            issueFilterPage.clearSearchInDialog();
            issueFilterPage.verifyOptionCount(0);
            issueFilterPage.closeDialog();
        });

        it('Cleanup: remove 2023 CWE Top 25 filter', () => {
            issueFilterPage.removeFilter('Standard: 2023 CWE Top 25');
        });
    });

    // ── Final cleanup ─────────────────────────────────────────────────────

    it('Clear all remaining filters', () => {
        issuePage.clearFiltersIfPresent();
    });
});
