// Suite 8 — Type G: Date Filters (First Detected, Last Triaged)
// Operators: In the last, Not in the last, In the range, Exclude, After, Before
// See IssueFilterTestPlan.md for full test cases

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
            cy.getByDataTestId(issueFilterObject.getFilterContent())
                .find('input[type="number"], [role="spinbutton"]')
                .should('be.visible');
        });

        it('Entering 30 days in "In the last" updates chip', () => {
            issueFilterPage.enterSpinValue('30');
            issueFilterPage.selectTimeUnit('days');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('First Detected', '30');
        });

        it('Changing time unit to weeks updates chip', () => {
            issueFilterPage.clickFilterChip('First Detected');
            issueFilterPage.selectTimeUnit('weeks');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('First Detected', 'weeks');
        });

        it('Changing time unit to months updates chip', () => {
            issueFilterPage.clickFilterChip('First Detected');
            issueFilterPage.selectTimeUnit('months');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('First Detected', 'months');
        });

        // ── "Not in the last" mode ────────────────────────────────────────

        it('"Not in the last" mode shows inverse filter', () => {
            issueFilterPage.clickFilterChip('First Detected');
            issueFilterPage.selectDateMode('Not in the last');
            issueFilterPage.enterSpinValue('30');
            issueFilterPage.selectTimeUnit('days');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyFilterChipVisible('First Detected');
        });

        // ── "In the range" mode ───────────────────────────────────────────

        it('"In the range" mode shows From and To date inputs', () => {
            issueFilterPage.clickFilterChip('First Detected');
            issueFilterPage.selectDateMode('In the range');
            cy.getByDataTestId(issueFilterObject.getFilterContent())
                .find('input').should('have.length.greaterThan', 1);
        });

        it('Entering a date range updates chip', () => {
            issueFilterPage.enterFromDate('2024-01-01');
            issueFilterPage.enterToDate('2025-12-31');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyFilterChipVisible('First Detected');
        });

        // ── "Exclude" mode ────────────────────────────────────────────────

        it('"Exclude" mode shows date range inputs for exclusion', () => {
            issueFilterPage.clickFilterChip('First Detected');
            issueFilterPage.selectDateMode('Exclude');
            cy.getByDataTestId(issueFilterObject.getFilterContent())
                .find('input').should('have.length.greaterThan', 1);
            issueFilterPage.closeDialog();
        });

        // ── "After" mode ──────────────────────────────────────────────────

        it('"After" mode shows a single date input', () => {
            issueFilterPage.clickFilterChip('First Detected');
            issueFilterPage.selectDateMode('After');
            cy.getByDataTestId(issueFilterObject.getFilterContent())
                .find('input').should('exist');
        });

        it('Selecting a date in "After" mode updates chip', () => {
            issueFilterPage.enterSingleDate('2024-01-01');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyFilterChipVisible('First Detected');
        });

        // ── "Before" mode ─────────────────────────────────────────────────

        it('"Before" mode shows a single date input', () => {
            issueFilterPage.clickFilterChip('First Detected');
            issueFilterPage.selectDateMode('Before');
            cy.getByDataTestId(issueFilterObject.getFilterContent())
                .find('input').should('exist');
        });

        it('Selecting a date in "Before" mode updates chip', () => {
            issueFilterPage.enterSingleDate('2026-12-31');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyFilterChipVisible('First Detected');
        });

        it('Cleanup: remove First Detected filter', () => {
            issueFilterPage.removeFilter('First Detected');
        });
    });

    // ═══════════════════════════════════════════════════════════════════════
    // Last Triaged — Spot Check
    // ═══════════════════════════════════════════════════════════════════════

    describe('Last Triaged filter', () => {

        it('Opening Last Triaged dialog shows operator modes', () => {
            issueFilterPage.addFilter('Last Triaged');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyFilterDialogContains('In the last');
            issueFilterPage.verifyFilterDialogContains('After');
            issueFilterPage.verifyFilterDialogContains('Before');
        });

        it('"In the last" 90 days updates chip', () => {
            issueFilterPage.selectDateMode('In the last');
            issueFilterPage.enterSpinValue('90');
            issueFilterPage.selectTimeUnit('days');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Last Triaged', '90');
        });

        it('"After" a date updates chip', () => {
            issueFilterPage.clickFilterChip('Last Triaged');
            issueFilterPage.selectDateMode('After');
            issueFilterPage.enterSingleDate('2024-01-01');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyFilterChipVisible('Last Triaged');
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
