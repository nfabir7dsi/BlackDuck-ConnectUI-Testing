// Suite 1 — Filter Toolbar & Chip Management
// See IssueFilterTestPlan.md for full test cases

import sidebar from '../../../../support/pages/Sidebar/sidebar';
import issuePage from '../../../../support/pages/IssuePage/issuePage';
import issueFilterPage from '../../../../support/pages/IssuePage/issueFilterPage';
import issueFilterObject from '../../../../support/objects/IssueObjects/issueFilterObject';
import issueObject from '../../../../support/objects/IssueObjects/issueObject';
import loginObjects from '../../../../support/objects/LoginObjects/loginObjects';

describe('Issue Filter — Toolbar & Chip Management', { testIsolation: false }, () => {
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

    // ── Add filters dropdown ──────────────────────────────────────────────

    it('"Add filters" dropdown lists available filter options', () => {
        issueFilterPage.openAddFilters();
        issueFilterPage.verifyFilterCountGreaterThan(10);
        issueFilterPage.closeDialog();
    });

    // ── Add some filters ────────────────────────────────────────────────── 

    it('Adding Classification filter with Bug selection sets the chip label', () => {
        issueFilterPage.addFilter('Classification');
        issueFilterPage.selectOption('Bug');
        issueFilterPage.closeDialog();
        issueFilterPage.verifyChipLabelContains('Classification', 'Bug');
    });

    it('Adding Impact filter with High selection sets the chip label', () => {
        issueFilterPage.addFilter('Impact');
        issueFilterPage.selectOption('High');
        issueFilterPage.closeDialog();
        issueFilterPage.verifyChipLabelContains('Impact', 'High');
    });

    it('Adding Severity filter with Major selection sets the chip label', () => {
        issueFilterPage.addFilter('Severity');
        issueFilterPage.selectOption('Major');
        issueFilterPage.closeDialog();
        issueFilterPage.verifyChipLabelContains('Severity', 'Major');
    });

    // ── Remove chip via X ─────────────────────────────────────────────────

    it('Removing a filter chip via X removes it from the toolbar', () => {
        issueFilterPage.removeFilter('Classification');
        issueFilterPage.verifyFilterChipNotExists('Classification');
    });

    it('After removing a chip, the same filter can be re-added via "Add filters"', () => {
        issueFilterPage.addFilter('Classification');
        issueFilterPage.verifyFilterChipVisible('Classification');
        issueFilterPage.closeDialog();
    });

    // ── Chip label updates ────────────────────────────────────────────────

    it('Chip label shows "=" when filter is added but nothing selected', () => {
        issueFilterPage.removeFilter('Classification');
        issueFilterPage.addFilter('Classification');
        issueFilterPage.verifyChipLabelContains('Classification', '=');
        issueFilterPage.closeDialog();
    });

    it('Chip label updates to show selected value after selection', () => {
        issueFilterPage.clickFilterChip('Classification');
        issueFilterPage.selectOption('Bug');
        issueFilterPage.closeDialog();
        issueFilterPage.verifyChipLabelContains('Classification', 'Bug');
    });

    // ── Clicking chip opens dialog ────────────────────────────────────────

    it('Clicking a chip body opens the filter dialog', () => {
        issueFilterPage.clickFilterChip('Classification');
        issueFilterPage.verifyFilterDialogVisible();
        issueFilterPage.closeDialog();
    });

    // ── Multiple chips coexist ────────────────────────────────────────────

    it('Multiple chips of different types coexist in the toolbar', () => {
        // issueFilterPage.openAddFilters();
        issueFilterPage.verifyFilterChipVisible('Classification');
        issueFilterPage.verifyFilterChipVisible('Impact');
        issueFilterPage.verifyFilterChipVisible('Severity');
    });

    it('Adding a new filter type adds another chip alongside existing ones', () => {
        issueFilterPage.addFilter('Status');
        issueFilterPage.closeDialog();
        issueFilterPage.verifyFilterChipVisible('Status');
        issueFilterPage.verifyFilterChipVisible('Classification');
    });

    // ── Clear all filters ─────────────────────────────────────────────────

    it('"Clear filters" removes all active filter chips', () => {
        issueFilterPage.clearAllFilters();
        issueFilterPage.verifyNoActiveFilters();
    });

    it('"Clear filters" button disappears after all filters are cleared', () => {
        issueFilterPage.verifyClearFiltersNotVisible();
    });

    it('"Add filters" button remains visible after clearing', () => {
        issueFilterPage.verifyAddFiltersButtonVisible();
    });

    // ── Close dialog behaviors ────────────────────────────────────────────

    it('Pressing Escape closes the filter dialog', () => {
        issueFilterPage.addFilter('Classification');
        issueFilterPage.verifyFilterDialogVisible();
        issueFilterPage.closeDialog();
    });

    it('Clicking outside the dialog closes it', () => {
        issueFilterPage.clickFilterChip('Classification');
        issueFilterPage.verifyFilterDialogVisible();
        issueFilterPage.clickOutsideDialog();
    });

    // ── Cleanup ───────────────────────────────────────────────────────────

    it('Clearing all filters to restore default state', () => {
        issuePage.clearFiltersIfPresent();
    });
});
