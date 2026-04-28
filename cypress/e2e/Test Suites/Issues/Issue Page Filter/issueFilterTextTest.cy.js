import sidebar from '../../../../support/pages/Sidebar/sidebar';
import issuePage from '../../../../support/pages/IssuePage/issuePage';
import issueFilterPage from '../../../../support/pages/IssuePage/issueFilterPage';
import issueFilterObject from '../../../../support/objects/IssueObjects/issueFilterObject';
import loginObjects from '../../../../support/objects/LoginObjects/loginObjects';

describe('Issue Filter — Wildcard Text Filters', { testIsolation: false }, () => {
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

    // ── File — Full Coverage ──────────────────────────────────────────────

    describe('File filter', () => {

        it('Opening File dialog shows input with wildcard hint', () => {
            issueFilterPage.addFilter('File');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyFilterDialogContains('*');
            issueFilterPage.verifyFilterDialogContains('?');
        });

        it('Entering exact text updates chip and filters table', () => {
            issueFilterPage.enterFilterValue('*.c');
            issueFilterPage.verifyChipLabelContains('File', '*.c');
            issueFilterPage.verifyTableHasResults();
        });

        it('Entering * wildcard matches broadly', () => {
            issueFilterPage.clickFilterChip('File');
            issueFilterPage.enterFilterValue('*');
            issueFilterPage.verifyChipLabelContains('File', '*');
            issueFilterPage.verifyTableHasResults();
        });

        it('Entering text with no matches shows zero results or empty state', () => {
            issueFilterPage.clickFilterChip('File');
            issueFilterPage.enterFilterValue('nonexistentfile_xyz_12345.zzz');
        });

        it('Clearing input removes the filter effect', () => {
            issueFilterPage.clickFilterChip('File');
            issueFilterPage.clearFilterInput();
            issueFilterPage.verifyFilterChipNotExists('File');
        });
    });

    // ── Function — Full Coverage ──────────────────────────────────────────

    describe('Function filter', () => {

        it('Opening Function dialog shows input with wildcard hint', () => {
            issueFilterPage.addFilter('Function');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyFilterDialogContains('*');
        });

        it('Entering exact text updates chip and filters table', () => {
            issueFilterPage.enterFilterValue('main');
            issueFilterPage.verifyChipLabelContains('Function', 'main');
        });

        it('Entering * wildcard matches broadly', () => {
            issueFilterPage.clickFilterChip('Function');
            issueFilterPage.enterFilterValue('*');
            issueFilterPage.verifyChipLabelContains('Function', '*');
            issueFilterPage.verifyTableHasResults();
        });

        it('Clearing input removes the filter effect', () => {
            issueFilterPage.clickFilterChip('Function');
            issueFilterPage.clearFilterInput();
            issueFilterPage.verifyFilterChipNotExists('Function');
        });
    });

    // ── Owner Name — Spot Check ───────────────────────────────────────────

    describe('Owner Name filter', () => {

        it('Opening Owner Name dialog shows wildcard hint', () => {
            issueFilterPage.addFilter('Owner Name');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyFilterDialogContains('*');
        });

        it('Entering * matches all owners', () => {
            issueFilterPage.enterFilterValue('*');
            issueFilterPage.verifyChipLabelContains('Owner Name', '*');
            issueFilterPage.verifyTableHasResults();
        });

        it('Cleanup: remove Owner Name filter', () => {
            issueFilterPage.removeFilter('Owner Name');
        });
    });

    // ── External Reference — Spot Check ───────────────────────────────────

    describe('External Reference filter', () => {

        it('Opening External Reference dialog shows wildcard hint', () => {
            issueFilterPage.addFilter('External Reference');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyFilterDialogContains('*');
        });

        it('Entering a value updates the chip', () => {
            issueFilterPage.enterFilterValue('*');
            issueFilterPage.verifyChipLabelContains('External Reference', '*');
        });

        it('Cleanup: remove External Reference filter', () => {
            issueFilterPage.removeFilter('External Reference');
        });
    });

    // ── Merge Key — Spot Check ────────────────────────────────────────────

    describe('Merge Key filter', () => {

        it('Opening Merge Key dialog shows wildcard hint', () => {
            issueFilterPage.addFilter('Merge Key');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyFilterDialogContains('*');
        });

        it('Entering a value updates the chip', () => {
            issueFilterPage.enterFilterValue('*');
            issueFilterPage.verifyChipLabelContains('Merge Key', '*');
        });

        it('Cleanup: remove Merge Key filter', () => {
            issueFilterPage.removeFilter('Merge Key');
        });
    });

    // ── Merge Extra — Spot Check ──────────────────────────────────────────

    describe('Merge Extra filter', () => {

        it('Opening Merge Extra dialog shows wildcard hint', () => {
            issueFilterPage.addFilter('Merge Extra');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyFilterDialogContains('*');
        });

        it('Entering a value updates the chip', () => {
            issueFilterPage.enterFilterValue('*');
            issueFilterPage.verifyChipLabelContains('Merge Extra', '*');
        });

        it('Cleanup: remove Merge Extra filter', () => {
            issueFilterPage.removeFilter('Merge Extra');
        });
    });

    // ── Function Merge Name — Spot Check ──────────────────────────────────

    describe('Function Merge Name filter', () => {

        it('Opening Function Merge Name dialog shows wildcard hint', () => {
            issueFilterPage.addFilter('Function Merge Name');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyFilterDialogContains('*');
        });

        it('Entering a value updates the chip', () => {
            issueFilterPage.enterFilterValue('*');
            issueFilterPage.verifyChipLabelContains('Function Merge Name', '*');
        });

        it('Cleanup: remove Function Merge Name filter', () => {
            issueFilterPage.removeFilter('Function Merge Name');
        });
    });

    // ── Final cleanup ─────────────────────────────────────────────────────

    it('Clear all remaining filters', () => {
        issuePage.clearFiltersIfPresent();
    });
});
