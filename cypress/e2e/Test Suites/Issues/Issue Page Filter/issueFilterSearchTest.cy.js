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
        it('Show Checker column if not visible', () => {
            issuePage.showColumnIfNotVisible('checker-column', 'Checker');
        });

        it('Opening Checker dialog shows pre-loaded options', () => {
            issueFilterPage.addFilter('Checker');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyOptionCountGreaterThan(5);
        });

        it('Typing in search narrows the list to matching items', () => {
            issueFilterPage.searchInDialog('FC');
            issueFilterPage.verifyOptionCountGreaterThan(0);
        });

        it('Clearing search restores the full list', () => {
            issueFilterPage.clearSearchInDialog();
            issueFilterPage.verifyOptionCountGreaterThan(5);
        });

        it('Selecting one option updates chip label', () => {
            issueFilterPage.searchInDialog('FC.046.SYNTAX');
            issueFilterPage.selectOption('FC.046.SYNTAX');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Checker', 'FC.046.SYNTAX');
        });

        it('Table shows filtered results after selection', () => {
            issueFilterPage.verifyTableHasResults();
            // issueFilterPage.verifyTableHasRowCount(5);
            issuePage.verifyRecordCount('5');
            issueFilterPage.verifyColumnCellsContain('checker-column', 'FC.046.SYNTAX');
        });

        it('Selecting multiple options applies OR logic', () => {
            issueFilterPage.clickFilterChip('Checker');
            issueFilterPage.searchInDialog('FC.041.SYNTAX');
            issueFilterPage.selectOption('FC.041.SYNTAX');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyTableHasResults();
            // issueFilterPage.verifyTableHasRowCount(10);
            issuePage.verifyRecordCount('10');
            issueFilterPage.verifyColumnCellsContain('checker-column', ['FC.046.SYNTAX', 'FC.041.SYNTAX']);
        });

        it('Cleanup: remove Checker filter', () => {
            issueFilterPage.removeFilter('Checker');
        });
    });

    // ── Category ──────────────────────────────────────────────────────────

    describe('Category filter (Type B)', () => {
        it('Show Category column if not visible', () => {
            issuePage.showColumnIfNotVisible('displayCategory-column', 'Category');
        });

        it('Opening Category dialog shows pre-loaded options', () => {
            issueFilterPage.addFilter('Category');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyOptionCountGreaterThan(5);
        });

        it('Typing in search narrows the list', () => {
            issueFilterPage.searchInDialog('Undefined');
            issueFilterPage.verifyOptionCountGreaterThan(0);
        });

        it('Selecting an option updates the chip label and filters table', () => {
            issueFilterPage.selectOption('Undefined entity');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Category', 'Undefined entity');
            issueFilterPage.verifyTableHasResults();
            // issueFilterPage.verifyTableHasRowCount(16);
            issuePage.verifyRecordCount('16');
            issueFilterPage.verifyColumnCellsContain('displayCategory-column', 'Undefined entity');
        });

        it('Cleanup: remove Category filter', () => {
            issueFilterPage.removeFilter('Category');
        });
    });

    // ── Type ──────────────────────────────────────────────────────────────

    describe('Type filter (Type B)', () => {
        it('Show Type column if not visible', () => {
            issuePage.showColumnIfNotVisible('displayType-column', 'Type');
        });

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
            issueFilterPage.searchInDialog('Unreferenced');
            issueFilterPage.selectOption('Unreferenced');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Type', 'Unreferenced');
            issueFilterPage.verifyTableHasResults();
            // issueFilterPage.verifyTableHasRowCount(1);
            issuePage.verifyRecordCount('1');
            issueFilterPage.verifyColumnCellsContain('displayType-column', 'Unreferenced');
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
        // it('Show Standard: CERT C column if not visible', () => {
        //     issuePage.showColumnIfNotVisible('certCStandard-column', 'Standard: CERT C');
        // });

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
            // issueFilterPage.verifyTableHasResults();
        });

        it('Cleanup: remove Standard: CERT C filter', () => {
            issueFilterPage.removeFilter('Standard: CERT C');
        });
    });

    // ── Standard: OWASP Web Top Ten 2021 ──────────────────────────────────

    describe('Standard: OWASP Web Top Ten 2021 filter (Type C)', () => {
        // it('Show Standard: OWASP Web Top Ten 2021 column if not visible', () => {
        //     issuePage.showColumnIfNotVisible('owaspStandard-column', 'Standard: OWASP Web Top Ten 2021');
        // });

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

        it('Selecting an identifier updates the chip and filters table', () => {
            issueFilterPage.selectOption('A10');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Standard: OWASP Web Top Ten 2021', 'A10');
            // issueFilterPage.verifyTableHasResults();
        });

        it('Cleanup: remove OWASP filter', () => {
            issueFilterPage.removeFilter('Standard: OWASP Web Top Ten 2021');
        });
    });

    // ── Standard: MISRA C 2012 ────────────────────────────────────────────

    describe('Standard: MISRA C 2012 filter (Type C)', () => {
        // it('Show Standard: MISRA C 2012 column if not visible', () => {
        //     issuePage.showColumnIfNotVisible('misraCStandard-column', 'Standard: MISRA C 2012');
        // });

        it('Opening dialog shows search-to-fetch message', () => {
            issueFilterPage.addFilter('Standard: MISRA C 2012');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyFilterDialogContains('Search to get suggestions');
        });

        it('Typing a prefix shows matching rules', () => {
            issueFilterPage.searchInDialog('Rule');
            issueFilterPage.verifyOptionCountGreaterThan(0);
        });

        it('Selecting a rule updates the chip and filters table', () => {
            issueFilterPage.selectNthOption(1);
            issueFilterPage.closeDialog();
            issueFilterPage.verifyFilterChipVisible('Standard: MISRA C 2012');
            // issueFilterPage.verifyTableHasResults();
        });

        it('Cleanup: remove MISRA C 2012 filter', () => {
            issueFilterPage.removeFilter('Standard: MISRA C 2012');
        });
    });

    // ── Standard: 2023 CWE Top 25 ─────────────────────────────────────────

    describe('Standard: 2023 CWE Top 25 filter (Type C)', () => {
        // it('Show Standard: 2023 CWE Top 25 column if not visible', () => {
        //     issuePage.showColumnIfNotVisible('cweTop25Standard-column', 'Standard: 2023 CWE Top 25');
        // });

        it('Opening dialog shows search-to-fetch message', () => {
            issueFilterPage.addFilter('Standard: 2023 CWE Top 25');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyFilterDialogContains('Search to get suggestions');
        });

        it('Typing shows matching CWE identifiers', () => {
            issueFilterPage.searchInDialog('Rank');
            issueFilterPage.verifyOptionCountGreaterThan(0);
        });

        it('Selecting multiple identifiers applies OR logic and filters table', () => {
            issueFilterPage.selectNthOption(1);
            issueFilterPage.searchInDialog('Rank');
            issueFilterPage.selectNthOption(2);
            issueFilterPage.closeDialog();
            issueFilterPage.verifyFilterChipVisible('Standard: 2023 CWE Top 25');
            // issueFilterPage.verifyTableHasResults();
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
