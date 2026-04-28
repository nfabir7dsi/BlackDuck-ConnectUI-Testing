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

        it('Opening CID dialog shows input with numeric range label', () => {
            issueFilterPage.addFilter('CID');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyInputLabel('Number or range: 1 or 2-5 or <4 or >6');
        });

        it('Entering an exact CID number filters the table', () => {
            issueFilterPage.enterFilterValue('10242');
            issueFilterPage.verifyChipLabelContains('CID', '10242');
            issueFilterPage.verifyTableHasResults();
        });

        it('Entering a range filters to matching rows', () => {
            issueFilterPage.clickFilterChip('CID');
            issueFilterPage.enterFilterValue('10242-10244');
            issueFilterPage.verifyChipLabelContains('CID', '10242-10244');
            issueFilterPage.verifyTableHasResults();
        });

        it('Entering <N filters to values less than N', () => {
            issueFilterPage.clickFilterChip('CID');
            issueFilterPage.enterFilterValue('<10243');
            issueFilterPage.verifyChipLabelContains('CID', '<10243');
            issueFilterPage.verifyTableHasResults();
        });

        it('Entering >N filters to values greater than N', () => {
            issueFilterPage.clickFilterChip('CID');
            issueFilterPage.enterFilterValue('>10240');
            issueFilterPage.verifyChipLabelContains('CID', '>10240');
            issueFilterPage.verifyTableHasResults();
        });

        it('Clearing input removes the filter effect', () => {
            issueFilterPage.clickFilterChip('CID');
            issueFilterPage.clearFilterInput();
            issueFilterPage.verifyFilterChipNotExists('CID');
        });
    });

    // ── Count ─────────────────────────────────────────────────────────────

    describe('Count filter (Type D)', () => {

        it('Opening Count dialog shows numeric range label', () => {
            issueFilterPage.addFilter('Count');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyInputLabel('Number or range: 1 or 2-5 or <4 or >6');
        });

        it('Entering an exact number filters the table', () => {
            issueFilterPage.enterFilterValue('1');
            issueFilterPage.verifyChipLabelContains('Count', '1');
            issueFilterPage.verifyTableHasResults();
        });

        it('Entering a range filters to matching rows', () => {
            issueFilterPage.clickFilterChip('Count');
            issueFilterPage.enterFilterValue('1-5');
            issueFilterPage.verifyChipLabelContains('Count', '1-5');
            issueFilterPage.verifyTableHasResults();
        });

        it('Entering >N filters to values greater than N', () => {
            issueFilterPage.clickFilterChip('Count');
            issueFilterPage.enterFilterValue('>0');
            issueFilterPage.verifyChipLabelContains('Count', '>0');
            issueFilterPage.verifyTableHasResults();
        });

        it('Clearing input removes the filter effect', () => {
            issueFilterPage.clickFilterChip('Count');
            issueFilterPage.clearFilterInput();
            issueFilterPage.verifyFilterChipNotExists('Count');
        });
    });

    // ── Score ─────────────────────────────────────────────────────────────

    describe('Score filter (Type D)', () => {

        it('Opening Score dialog shows numeric range label', () => {
            issueFilterPage.addFilter('Score');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyInputLabel('Number or range: 1 or 2-5 or <4 or >6');
        });

        it('Entering an exact number filters the table', () => {
            issueFilterPage.enterFilterValue('5');
            issueFilterPage.verifyChipLabelContains('Score', '5');
        });

        it('Entering <N filters to values less than N', () => {
            issueFilterPage.clickFilterChip('Score');
            issueFilterPage.enterFilterValue('<10');
            issueFilterPage.verifyChipLabelContains('Score', '<10');
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

        it('Opening CWE dialog shows input labeled "Enter CWE ID"', () => {
            issueFilterPage.addFilter('CWE');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyFilterDialogContains('Enter CWE ID');
        });

        it('Entering a known CWE ID updates chip and filters table', () => {
            issueFilterPage.enterFilterValue('476');
            issueFilterPage.verifyChipLabelContains('CWE', '476');
            issueFilterPage.verifyTableHasResults();
        });

        it('Entering a different CWE ID updates the filter', () => {
            issueFilterPage.clickFilterChip('CWE');
            issueFilterPage.enterFilterValue('119');
            issueFilterPage.verifyChipLabelContains('CWE', '119');
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
