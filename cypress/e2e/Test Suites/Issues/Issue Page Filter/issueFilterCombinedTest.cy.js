import sidebar from '../../../../support/pages/Sidebar/sidebar';
import issuePage from '../../../../support/pages/IssuePage/issuePage';
import issueFilterPage from '../../../../support/pages/IssuePage/issueFilterPage';
import issueFilterObject from '../../../../support/objects/IssueObjects/issueFilterObject';
import loginObjects from '../../../../support/objects/LoginObjects/loginObjects';
import issueObject from '../../../../support/objects/IssueObjects/issueObject';

describe('Issue Filter — Multi-filter Combinations, Persistence & Chip Editing', { testIsolation: false }, () => {
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
    // Suite 11 — Multi-filter Combinations
    // ═══════════════════════════════════════════════════════════════════════

    describe('Multi-filter combinations', () => {

        it('Applying 2 filters narrows results with AND logic', () => {
            // Add Classification = Bug
            issueFilterPage.addFilter('Classification');
            issueFilterPage.selectOption('Bug');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Classification', 'Bug');

            // Add Status = New
            issueFilterPage.addFilter('Status');
            issueFilterPage.selectOption('New');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Status', 'New');

            // Both chips visible
            issueFilterPage.verifyFilterChipVisible('Classification');
            issueFilterPage.verifyFilterChipVisible('Status');
        });

        it('Applying a 3rd filter further narrows results', () => {
            issueFilterPage.addFilter('Impact');
            issueFilterPage.selectOption('High');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Impact', 'High');

            // All 3 chips visible
            issueFilterPage.verifyFilterChipVisible('Classification');
            issueFilterPage.verifyFilterChipVisible('Status');
            issueFilterPage.verifyFilterChipVisible('Impact');
        });

        it('Removing one filter from a combination expands results', () => {
            issueFilterPage.removeFilter('Impact');
            issueFilterPage.verifyFilterChipNotExists('Impact');
            issueFilterPage.verifyFilterChipVisible('Classification');
            issueFilterPage.verifyFilterChipVisible('Status');
        });

        it('Two values within the same filter use OR logic', () => {
            issueFilterPage.clickFilterChip('Status');
            issueFilterPage.selectOption('Dismissed');
            issueFilterPage.closeDialog();
            // Chip should show both values
            issueFilterPage.verifyChipLabelContains('Status', 'New');
            issueFilterPage.verifyChipLabelContains('Status', 'Dismissed');
        });

        it('"Clear filters" when multiple filters are active removes all', () => {
            issueFilterPage.clearAllFilters();
            issueFilterPage.verifyNoActiveFilters();
            issueFilterPage.verifyClearFiltersNotVisible();
        });
    });

    // ═══════════════════════════════════════════════════════════════════════
    // Suite 12 — Filter State & URL Persistence
    // ═══════════════════════════════════════════════════════════════════════

    describe('Filter state & URL persistence', () => {

        it('Applying a filter updates URL query params', () => {
            issueFilterPage.addFilter('Classification');
            issueFilterPage.selectOption('Bug');
            issueFilterPage.closeDialog();
            cy.url().should('include', 'Bug');
        });

        it('Reloading the page preserves the filter from URL', () => {
            cy.reload();
            cy.waitTillVisible(`[data-testid="${issueObject.getFilterTrigger()}"]`);
            issueFilterPage.verifyFilterChipVisible('Classification');
            issueFilterPage.verifyChipLabelContains('Classification', 'Bug');
        });

        it('Sharing URL in a new tab loads the same filters', () => {
            cy.url().then((currentUrl) => {
                cy.visit(currentUrl);
                cy.waitTillVisible(`[data-testid="${issueObject.getFilterTrigger()}"]`);
                issueFilterPage.verifyFilterChipVisible('Classification');
                issueFilterPage.verifyChipLabelContains('Classification', 'Bug');
            });
        });

        it('Cleanup: clear all filters', () => {
            issueFilterPage.clearAllFilters();
        });
    });

    // ═══════════════════════════════════════════════════════════════════════
    // Suite 13 — Filter Chip Editing
    // ═══════════════════════════════════════════════════════════════════════

    describe('Filter chip editing', () => {

        it('Setup: add Classification filter with "Bug" selected', () => {
            issueFilterPage.addFilter('Classification');
            issueFilterPage.selectOption('Bug');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Classification', 'Bug');
        });

        it('Clicking an active chip re-opens dialog with current selection pre-populated', () => {
            issueFilterPage.clickFilterChip('Classification');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyOptionIsSelected('Bug');
        });

        it('Modifying selection in re-opened dialog updates the chip label', () => {
            // Deselect Bug, select Pending
            issueFilterPage.selectOption('Pending');
            issueFilterPage.selectOption('Bug');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Classification', 'Pending');
        });

        it('Pressing Escape on re-opened dialog preserves original selection', () => {
            issueFilterPage.clickFilterChip('Classification');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Classification', 'Pending');
        });

        it('Cleanup: clear all filters', () => {
            issueFilterPage.clearAllFilters();
            issueFilterPage.verifyNoActiveFilters();
        });
    });

    // ── Final cleanup ─────────────────────────────────────────────────────

    it('Clear all remaining filters', () => {
        issuePage.clearFiltersIfPresent();
    });
});
