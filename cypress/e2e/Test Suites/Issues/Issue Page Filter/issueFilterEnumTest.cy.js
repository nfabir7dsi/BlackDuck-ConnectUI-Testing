// Suite 2 — Type A: Multi-select Enum Filters
// Full coverage on Classification; spot-check Status, Action, Severity, Impact, Issue Kind, Legacy, Fix Target
// See IssueFilterTestPlan.md for full test cases

import sidebar from '../../../../support/pages/Sidebar/sidebar';
import issuePage from '../../../../support/pages/IssuePage/issuePage';
import issueFilterPage from '../../../../support/pages/IssuePage/issueFilterPage';
import issueFilterObject from '../../../../support/objects/IssueObjects/issueFilterObject';
import loginObjects from '../../../../support/objects/LoginObjects/loginObjects';

describe('Issue Filter — Multi-select Enum Filters', { testIsolation: false }, () => {
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

    // ── Classification — Full Coverage ────────────────────────────────────

    describe('Classification filter', () => {

        it('Adding Classification filter opens the dialog', () => {
            issueFilterPage.addFilter('Classification');
            issueFilterPage.verifyFilterDialogVisible();
        });

        it('Dialog shows all expected Classification options', () => {
            issueFilterPage.verifyAllOptions(issueFilterObject.getClassificationOptions());
            issueFilterPage.verifyOptionCount(issueFilterObject.getClassificationOptions().length);
        });

        it('Selecting one option updates the chip label', () => {
            issueFilterPage.selectOption('Bug');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Classification', 'Bug');
        });

        it('Table shows results after selecting a single option', () => {
            issueFilterPage.verifyTableHasResults();
        });

        it('Selecting multiple options shows OR logic results', () => {
            issueFilterPage.clickFilterChip('Classification');
            issueFilterPage.selectOption('Pending');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyTableHasResults();
        });

        it('Typing in search box narrows the options list', () => {
            issueFilterPage.clickFilterChip('Classification');
            issueFilterPage.searchInDialog('Bug');
            issueFilterPage.verifyOptionCount(1);
        });

        it('Clearing search restores all options', () => {
            issueFilterPage.clearSearchInDialog();
            issueFilterPage.verifyOptionCount(issueFilterObject.getClassificationOptions().length);
        });

        it('Deselecting all options removes the filter effect', () => {
            // Deselect Bug and Pending (currently selected)
            issueFilterPage.selectOption('Bug');
            issueFilterPage.selectOption('Pending');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Classification', '=');
        });

        it('Pressing Escape closes the dialog', () => {
            issueFilterPage.clickFilterChip('Classification');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.closeDialog();
        });

        it('Clicking outside the dialog closes it', () => {
            issueFilterPage.clickFilterChip('Classification');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.clickOutsideDialog();
        });

        it('Cleanup: remove Classification filter', () => {
            issueFilterPage.removeFilter('Classification');
            issueFilterPage.verifyFilterChipNotExists('Classification');
        });
    });

    // ── Status — Spot Check ───────────────────────────────────────────────

    describe('Status filter', () => {

        it('Adding Status filter shows correct options', () => {
            issueFilterPage.addFilter('Status');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyAllOptions(issueFilterObject.getStatusOptions());
            issueFilterPage.verifyOptionCount(issueFilterObject.getStatusOptions().length);
        });

        it('Selecting "New" updates chip and filters table', () => {
            issueFilterPage.selectOption('New');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Status', 'New');
            issueFilterPage.verifyTableHasResults();
        });

        it('Cleanup: remove Status filter', () => {
            issueFilterPage.removeFilter('Status');
        });
    });

    // ── Action — Spot Check ───────────────────────────────────────────────

    describe('Action filter', () => {

        it('Adding Action filter shows correct options', () => {
            issueFilterPage.addFilter('Action');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyAllOptions(issueFilterObject.getActionOptions());
            issueFilterPage.verifyOptionCount(issueFilterObject.getActionOptions().length);
        });

        it('Selecting "Undecided" updates chip and filters table', () => {
            issueFilterPage.selectOption('Undecided');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Action', 'Undecided');
            issueFilterPage.verifyTableHasResults();
        });

        it('Cleanup: remove Action filter', () => {
            issueFilterPage.removeFilter('Action');
        });
    });

    // ── Severity — Spot Check ─────────────────────────────────────────────

    describe('Severity filter', () => {

        it('Adding Severity filter shows correct options', () => {
            issueFilterPage.addFilter('Severity');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyAllOptions(issueFilterObject.getSeverityOptions());
            issueFilterPage.verifyOptionCount(issueFilterObject.getSeverityOptions().length);
        });

        it('Selecting "Unspecified" updates chip', () => {
            issueFilterPage.selectOption('Unspecified');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Severity', 'Unspecified');
        });

        it('Cleanup: remove Severity filter', () => {
            issueFilterPage.removeFilter('Severity');
        });
    });

    // ── Impact — Spot Check ───────────────────────────────────────────────

    describe('Impact filter', () => {

        it('Adding Impact filter shows correct options', () => {
            issueFilterPage.addFilter('Impact');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyAllOptions(issueFilterObject.getImpactOptions());
            issueFilterPage.verifyOptionCount(issueFilterObject.getImpactOptions().length);
        });

        it('Selecting "High" updates chip and filters table', () => {
            issueFilterPage.selectOption('High');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Impact', 'High');
            issueFilterPage.verifyTableHasResults();
        });

        it('Cleanup: remove Impact filter', () => {
            issueFilterPage.removeFilter('Impact');
        });
    });

    // ── Issue Kind — Spot Check ───────────────────────────────────────────

    describe('Issue Kind filter', () => {

        it('Adding Issue Kind filter shows correct options', () => {
            issueFilterPage.addFilter('Issue Kind');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyAllOptions(issueFilterObject.getIssueKindOptions());
            issueFilterPage.verifyOptionCount(issueFilterObject.getIssueKindOptions().length);
        });

        it('Selecting "Quality" updates chip', () => {
            issueFilterPage.selectOption('Quality');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Issue Kind', 'Quality');
        });

        it('Cleanup: remove Issue Kind filter', () => {
            issueFilterPage.removeFilter('Issue Kind');
        });
    });

    // ── Legacy — Spot Check ───────────────────────────────────────────────

    describe('Legacy filter', () => {

        it('Adding Legacy filter shows correct options', () => {
            issueFilterPage.addFilter('Legacy');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyAllOptions(issueFilterObject.getLegacyOptions());
            issueFilterPage.verifyOptionCount(issueFilterObject.getLegacyOptions().length);
        });

        it('Selecting "False" updates chip', () => {
            issueFilterPage.selectOption('False');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Legacy', 'False');
        });

        it('Cleanup: remove Legacy filter', () => {
            issueFilterPage.removeFilter('Legacy');
        });
    });

    // ── Fix Target — Spot Check ───────────────────────────────────────────

    describe('Fix Target filter', () => {

        it('Adding Fix Target filter shows correct options', () => {
            issueFilterPage.addFilter('Fix Target');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyAllOptions(issueFilterObject.getFixTargetOptions());
            issueFilterPage.verifyOptionCount(issueFilterObject.getFixTargetOptions().length);
        });

        it('Selecting "Untargeted" updates chip', () => {
            issueFilterPage.selectOption('Untargeted');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Fix Target', 'Untargeted');
        });

        it('Cleanup: remove Fix Target filter', () => {
            issueFilterPage.removeFilter('Fix Target');
        });
    });

    // ── Final cleanup ─────────────────────────────────────────────────────

    it('Clear all remaining filters', () => {
        issuePage.clearFiltersIfPresent();
    });
});
