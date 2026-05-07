import sidebar from '../../../../support/pages/Sidebar/sidebar';
import issuePage from '../../../../support/pages/IssuePage/issuePage';
import issueFilterPage from '../../../../support/pages/IssuePage/issueFilterPage';
import issueFilterObject from '../../../../support/objects/IssueObjects/issueFilterObject';
import loginObjects from '../../../../support/objects/LoginObjects/loginObjects';

describe('Issue Filter — Date Filters', { testIsolation: false }, () => {
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
    // First Detected — Full Coverage
    // ═══════════════════════════════════════════════════════════════════════

    describe('First Detected filter', () => {
        it('Show First Detected column if not visible', () => {
            issuePage.showColumnIfNotVisible('firstDetected-column', 'First Detected');
        });

        it('Opening First Detected dialog shows 6 operator modes', () => {
            issueFilterPage.addFilter('First Detected');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyFilterDialogContains('In the last');
            issueFilterPage.verifyFilterDialogContains('Not in the last');
            issueFilterPage.verifyFilterDialogContains('In the range');
            issueFilterPage.verifyFilterDialogContains('Exclude');
            issueFilterPage.verifyFilterDialogContains('After');
            issueFilterPage.verifyFilterDialogContains('Before');
        });

        // ── "In the last" mode ────────────────────────────────────────────

        it('"In the last" mode shows spinbutton and time unit dropdown', () => {
            issueFilterPage.selectDateMode('In the last');
            issueFilterPage.verifyNumberInputIsVisible();
        });

        it('Entering 30 days in "In the last" updates chip and filters table', () => {
            issueFilterPage.enterSpinValue('30');
            issueFilterPage.selectTimeUnit('days');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('First Detected', '30');
            issueFilterPage.verifyTableDoesntHaveResults();
        });

        it('Changing time unit to weeks updates chip and filters table', () => {
            issueFilterPage.clickFilterChip('First Detected');
            issueFilterPage.selectTimeUnit('weeks');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('First Detected', 'weeks');
            issueFilterPage.verifyTableHasResults();
        });

        it('Changing time unit to months updates chip and filters table', () => {
            issueFilterPage.clickFilterChip('First Detected');
            issueFilterPage.selectTimeUnit('months');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('First Detected', 'months');
            issueFilterPage.verifyTableHasResults();
        });

        // ── "Not in the last" mode ────────────────────────────────────────

        it('"Not in the last" mode shows inverse filter and filters table', () => {
            issueFilterPage.clickFilterChip('First Detected');
            issueFilterPage.selectDateMode('Not in the last');
            issueFilterPage.enterSpinValue('30');
            issueFilterPage.selectTimeUnit('days');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyFilterChipVisible('First Detected');
            issueFilterPage.verifyTableHasResults();
        });

        // ── "In the range" mode ───────────────────────────────────────────

        it('"In the range" mode shows From and To date inputs', () => {
            issueFilterPage.clickFilterChip('First Detected');
            issueFilterPage.selectDateMode('In the range');
            issueFilterPage.verifyDateInputButtonIsVisible(2);
        });

        it('Entering a date range updates chip and filters table', () => {
            issueFilterPage.enterFromDate('2024-01-01');
            issueFilterPage.enterToDate('2025-12-31');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyFilterChipVisible('First Detected');
            issueFilterPage.verifyTableHasResults();
        });

        // ── "Exclude" mode ────────────────────────────────────────────────

        it('"Exclude" mode shows date range inputs for exclusion', () => {
            issueFilterPage.clickFilterChip('First Detected');
            issueFilterPage.selectDateMode('Exclude');
            issueFilterPage.verifyDateInputButtonIsVisible(2);
            issueFilterPage.closeDialog();
        });

        // ── "After" mode ──────────────────────────────────────────────────

        it('"After" mode shows a single date input', () => {
            issueFilterPage.clickFilterChip('First Detected');
            issueFilterPage.selectDateMode('After');
            issueFilterPage.verifyDateInputButtonIsVisible(1);
        });

        it('Selecting a date in "After" mode updates chip and filters table', () => {
            issueFilterPage.enterSingleDate('2025-01-01');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyFilterChipVisible('First Detected');
            issueFilterPage.verifyTableHasResults();
        });

        // ── "Before" mode ─────────────────────────────────────────────────

        it('"Before" mode shows a single date input', () => {
            issueFilterPage.clickFilterChip('First Detected');
            issueFilterPage.selectDateMode('Before');
            issueFilterPage.verifyDateInputButtonIsVisible(1);
        });

        it('Selecting a date in "Before" mode updates chip and filters table', () => {
            issueFilterPage.enterSingleDate('2025-01-01');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyFilterChipVisible('First Detected');
            issueFilterPage.verifyTableDoesntHaveResults();
        });

        it('Cleanup: remove First Detected filter', () => {
            issueFilterPage.removeFilter('First Detected');
        });
    });

    // ═══════════════════════════════════════════════════════════════════════
    // Last Triaged — Spot Check
    // ═══════════════════════════════════════════════════════════════════════

    describe('Last Triaged filter', () => {
        it('Show Last Triaged column if not visible', () => {
            issuePage.showColumnIfNotVisible('lastTriaged-column', 'Last Triaged');
        });

        it('Opening Last Triaged dialog shows operator modes', () => {
            issueFilterPage.addFilter('Last Triaged');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyFilterDialogContains('In the last');
            issueFilterPage.verifyFilterDialogContains('After');
            issueFilterPage.verifyFilterDialogContains('Before');
        });

        it('"In the last" 90 days updates chip and filters table', () => {
            issueFilterPage.selectDateMode('In the last');
            issueFilterPage.enterSpinValue('90');
            issueFilterPage.selectTimeUnit('days');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Last Triaged', '90');
            issueFilterPage.verifyTableHasResults();
            issuePage.verifyRecordCount(32);
        });

        it('"After" a date updates chip and filters table', () => {
            issueFilterPage.clickFilterChip('Last Triaged');
            issueFilterPage.selectDateMode('After');
            issueFilterPage.enterSingleDate('2025-01-01');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyFilterChipVisible('Last Triaged');
            issueFilterPage.verifyTableHasResults();
            issuePage.verifyRecordCount(32);
        });

        it('Cleanup: remove Last Triaged filter', () => {
            issueFilterPage.removeFilter('Last Triaged');
        });
    });

    // ── Final cleanup ─────────────────────────────────────────────────────

    it('Clear all remaining filters', () => {
        issuePage.clearFiltersIfPresent();
    });
});
