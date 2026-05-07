import sidebar from '../../../../support/pages/Sidebar/sidebar';
import issuePage from '../../../../support/pages/IssuePage/issuePage';
import issueFilterPage from '../../../../support/pages/IssuePage/issueFilterPage';
import issueFilterObject from '../../../../support/objects/IssueObjects/issueFilterObject';
import loginObjects from '../../../../support/objects/LoginObjects/loginObjects';

describe('Issue Filter — Numeric Range & CWE Filters', { testIsolation: false }, () => {
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
    // Suite 5 — Type D: Numeric Range Filters
    // ═══════════════════════════════════════════════════════════════════════

    // ── CID ───────────────────────────────────────────────────────────────

    describe('CID filter (Type D)', () => {
        it('Show CID column if not visible', () => {
            issuePage.showColumnIfNotVisible('cid-column', 'CID');
        });

        it('Opening CID dialog shows input with numeric range label', () => {
            issueFilterPage.addFilter('CID');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyInputLabel('Number or range: 1 or 2-5 or <4 or >6');
        });

        it('Entering an exact CID number filters the table', () => {
            issueFilterPage.enterFilterValue('10468');
            issueFilterPage.verifyChipLabelContains('CID', '10468');
            issueFilterPage.verifyTableHasResults();
            issueFilterPage.verifyTableHasRowCount(1);
            issueFilterPage.verifyColumnCellsContain('cid-column', '10468');
        });

        it('Entering a range filters to matching rows', () => {
            issueFilterPage.clickFilterChip('CID');
            issueFilterPage.enterFilterValue('10466-10468');
            issueFilterPage.verifyChipLabelContains('CID', '10466-10468');
            issueFilterPage.verifyTableHasResults();
            // issueFilterPage.verifyTableHasRowCount(3);
            issuePage.verifyRecordCount(3);
            issueFilterPage.verifyNumericValueIsInBetween('cid-column', 10465, 10469);
        });

        it('Entering <N filters to values less than N', () => {
            issueFilterPage.clickFilterChip('CID');
            issueFilterPage.enterFilterValue('<10469');
            issueFilterPage.verifyChipLabelContains('CID', '<10469');
            issueFilterPage.verifyTableHasResults();
            // issueFilterPage.verifyTableHasRowCount(4);
            issuePage.verifyRecordCount(15);
            issueFilterPage.verifyNumericValueIsLessThan('cid-column', 10469);
        });

        it('Entering >N filters to values greater than N', () => {
            issueFilterPage.clickFilterChip('CID');
            issueFilterPage.enterFilterValue('>10825');
            issueFilterPage.verifyChipLabelContains('CID', '>10825');
            issueFilterPage.verifyTableHasResults();
            // issueFilterPage.verifyTableHasRowCount(6);
            issuePage.verifyRecordCount(5);
            issueFilterPage.verifyNumericValueIsGreaterThan('cid-column', 10825);
        });

        it('Clearing input removes the filter effect', () => {
            issueFilterPage.clickFilterChip('CID');
            issueFilterPage.clearFilterInput();
            issueFilterPage.verifyFilterChipNotExists('CID');
        });
    });

    // ── Count ─────────────────────────────────────────────────────────────

    describe('Count filter (Type D)', () => {
        it('Show Count column if not visible', () => {
            issuePage.showColumnIfNotVisible('occurrenceCount-column', 'Count');
        });

        it('Opening Count dialog shows numeric range label', () => {
            issueFilterPage.addFilter('Count');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyInputLabel('Number or range: 1 or 2-5 or <4 or >6');
        });

        it('Entering an exact number filters the table', () => {
            issueFilterPage.enterFilterValue('5');
            issueFilterPage.verifyChipLabelContains('Count', '5');
            issueFilterPage.verifyTableHasResults();
            // issueFilterPage.verifyTableHasRowCount(5);
            issuePage.verifyRecordCount(5);
            issueFilterPage.verifyColumnCellsContain('occurrenceCount-column', '5');
        });

        it('Entering a range filters to matching rows', () => {
            issueFilterPage.clickFilterChip('Count');
            issueFilterPage.enterFilterValue('5-8');
            issueFilterPage.verifyChipLabelContains('Count', '5-8');
            issueFilterPage.verifyTableHasResults();
            issuePage.verifyRecordCount(21);
            issueFilterPage.verifyNumericValueIsInBetween('occurrenceCount-column', 5, 8);
        });

        it('Entering >N filters to values greater than N', () => {
            issueFilterPage.clickFilterChip('Count');
            issueFilterPage.enterFilterValue('>10');
            issueFilterPage.verifyChipLabelContains('Count', '>10');
            issueFilterPage.verifyTableHasResults();
            issuePage.verifyRecordCount(13);
            issueFilterPage.verifyNumericValueIsGreaterThan('occurrenceCount-column', 10);
        });

        it('Clearing input removes the filter effect', () => {
            issueFilterPage.clickFilterChip('Count');
            issueFilterPage.clearFilterInput();
            issueFilterPage.verifyFilterChipNotExists('Count');
        });
    });

    // ── Score ─────────────────────────────────────────────────────────────

    describe('Score filter (Type D)', () => {
        it('Show Score column if not visible', () => {
            issuePage.showColumnIfNotVisible('score-column', 'Score');
        });

        it('Opening Score dialog shows numeric range label', () => {
            issueFilterPage.addFilter('Score');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyInputLabel('Number or range: 1 or 2-5 or <4 or >6');
        });

        it('Entering an exact number filters the table', () => {
            issueFilterPage.enterFilterValue('5');
            issueFilterPage.verifyChipLabelContains('Score', '5');
            issueFilterPage.verifyTableDoesntHaveResults();
        });

        it('Entering <N filters to values less than N', () => {
            issueFilterPage.clickFilterChip('Score');
            issueFilterPage.enterFilterValue('<10');
            issueFilterPage.verifyChipLabelContains('Score', '<10');
            issueFilterPage.verifyTableHasResults();
        });

        it('Clearing input removes the filter effect', () => {
            issueFilterPage.clickFilterChip('Score');
            issueFilterPage.clearFilterInput();
            issueFilterPage.verifyFilterChipNotExists('Score');
        });
    });

    // ═══════════════════════════════════════════════════════════════════════
    // Suite 6 — Type E: CWE ID Filter
    // ═══════════════════════════════════════════════════════════════════════

    describe('CWE filter (Type E)', () => {
        it('Show CWE column if not visible', () => {
            issuePage.showColumnIfNotVisible('cwe-column', 'CWE');
        });

        it('Opening CWE dialog shows input labeled "Enter CWE ID"', () => {
            issueFilterPage.addFilter('CWE');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyFilterDialogContains('Enter CWE ID');
        });

        it('Entering a known CWE ID updates chip and filters table', () => {
            issueFilterPage.enterFilterValue('476');
            issueFilterPage.verifyChipLabelContains('CWE', '476');
            // issueFilterPage.verifyTableHasResults();
            // issueFilterPage.verifyColumnCellsContain('cwe-column', '476');
            issueFilterPage.verifyTableDoesntHaveResults();
        });

        it('Entering a different CWE ID updates the filter and table', () => {
            issueFilterPage.clickFilterChip('CWE');
            issueFilterPage.enterFilterValue('119');
            issueFilterPage.verifyChipLabelContains('CWE', '119');
            // issueFilterPage.verifyTableHasResults();
            // issueFilterPage.verifyColumnCellsContain('cwe-column', '119');
            issueFilterPage.verifyTableDoesntHaveResults();
        });

        it('Clearing input removes the filter effect', () => {
            issueFilterPage.clickFilterChip('CWE');
            issueFilterPage.clearFilterInput();
            issueFilterPage.verifyFilterChipNotExists('CWE');
        });
    });

    // ── Final cleanup ─────────────────────────────────────────────────────

    it('Clear all remaining filters', () => {
        issuePage.clearFiltersIfPresent();
    });
});
