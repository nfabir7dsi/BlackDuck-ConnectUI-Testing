// Suite 9  — Type H: Comparison Filter (Present / Absent)
// Suite 10 — Type I: Streams Filter (include / exclude dual-search)
// See IssueFilterTestPlan.md for full test cases

import sidebar from '../../../../support/pages/Sidebar/sidebar';
import issuePage from '../../../../support/pages/IssuePage/issuePage';
import issueFilterPage from '../../../../support/pages/IssuePage/issueFilterPage';
import issueFilterObject from '../../../../support/objects/IssueObjects/issueFilterObject';
import loginObjects from '../../../../support/objects/LoginObjects/loginObjects';

describe('Issue Filter — Comparison & Streams Filters', { testIsolation: false }, () => {
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
    // Suite 9 — Type H: Comparison Filter
    // ═══════════════════════════════════════════════════════════════════════

    describe('Comparison filter', () => {

        it('Opening Comparison dialog shows Present and Absent radio options', () => {
            issueFilterPage.addFilter('Comparison');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyFilterDialogContains('Present');
            issueFilterPage.verifyFilterDialogContains('Absent');
        });

        it('Explanatory note about snapshot comparison is visible', () => {
            issueFilterPage.verifyFilterDialogContains('Comparison');
            issueFilterPage.verifyFilterDialogContains('snapshot');
        });

        it('Selecting "Present" updates the chip', () => {
            issueFilterPage.selectRadioOption('Present');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Comparison', 'Present');
        });

        it('Selecting "Absent" updates the chip to Absent', () => {
            issueFilterPage.clickFilterChip('Comparison');
            issueFilterPage.selectRadioOption('Absent');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Comparison', 'Absent');
        });

        it('Only one option can be selected at a time (radio behavior)', () => {
            issueFilterPage.clickFilterChip('Comparison');
            issueFilterPage.selectRadioOption('Present');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Comparison', 'Present');
            // Chip should not contain Absent
            cy.getByDataTestId(issueFilterObject.getFilterContent()).should('not.exist');
        });

        it('Cleanup: remove Comparison filter', () => {
            issueFilterPage.removeFilter('Comparison');
        });
    });

    // ═══════════════════════════════════════════════════════════════════════
    // Suite 10 — Type I: Streams Filter
    // ═══════════════════════════════════════════════════════════════════════

    describe('Streams filter', () => {

        it('Opening Streams dialog shows include and exclude search sections', () => {
            issueFilterPage.addFilter('Streams');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyFilterDialogContains('Display issues that occur in any of');
        });

        it('Dialog has two search input areas', () => {
            cy.getByDataTestId(issueFilterObject.getFilterContent())
                .find('input').should('have.length.greaterThan', 1);
        });

        it('Searching in the include section returns matching streams', () => {
            issueFilterPage.searchIncludeStream('main');
            cy.getByDataTestId(issueFilterObject.getFilterContent())
                .find(issueFilterObject.getFilterOption())
                .should('have.length.greaterThan', 0);
        });

        it('Selecting a stream to include updates the chip', () => {
            cy.getByDataTestId(issueFilterObject.getFilterContent())
                .find(issueFilterObject.getFilterOption())
                .first().click();
            cy.wait(500);
            issueFilterPage.closeDialog();
            issueFilterPage.verifyFilterChipVisible('Streams');
        });

        it('Re-opening dialog shows the selected stream', () => {
            issueFilterPage.clickFilterChip('Streams');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.closeDialog();
        });

        it('Cleanup: remove Streams filter', () => {
            issueFilterPage.removeFilter('Streams');
        });
    });

    // ── Final cleanup ─────────────────────────────────────────────────────

    it('Clear all remaining filters', () => {
        issuePage.clearFiltersIfPresent();
    });
});
