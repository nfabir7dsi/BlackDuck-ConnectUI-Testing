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

        it('Selecting "Present" updates the chip and filters table', () => {
            issueFilterPage.selectRadioOption('Present');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Comparison', 'Present');
            issueFilterPage.verifyTableDoesntHaveResults();
        });

        it('Selecting "Absent" updates the chip to Absent and filters table', () => {
            issueFilterPage.clickFilterChip('Comparison');
            issueFilterPage.selectRadioOption('Absent');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Comparison', 'Absent');
            issueFilterPage.verifyTableHasResults();
        });

        it('Only one option can be selected at a time (radio behavior)', () => {
            issueFilterPage.clickFilterChip('Comparison');
            issueFilterPage.selectRadioOption('Absent');
            issueFilterPage.selectRadioOption('Present');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Comparison', 'Present');
            issueFilterPage.verifyTableDoesntHaveResults();
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
            issueFilterPage.verifyDialogInputAreaCount(2);
        });

        it('Searching in the include section returns matching streams', () => {
            issueFilterPage.searchIncludeStream('xml');
            issueFilterPage.verifyOptionCountGreaterThan(0);
        });

        it('Selecting a stream to include updates the chip and filters table', () => {
            issueFilterPage.selectNthOption(1);
            issueFilterPage.closeDialog();
            issueFilterPage.verifyFilterChipVisible('Streams');
            issueFilterPage.verifyTableHasResults();
        });

        it('Excluding a stream updates the chip and filters table accordingly', () => {
            issueFilterPage.clickFilterChip('Streams');
            issueFilterPage.searchExcludeStream('xml');
            issueFilterPage.selectNthOption(1);
            issueFilterPage.closeDialog();
            issueFilterPage.verifyFilterChipVisible('Streams');
            issueFilterPage.verifyTableDoesntHaveResults();
        });

        it('Removing an excluded stream updates the chip and filters table accordingly', () => {
            issueFilterPage.clickFilterChip('Streams');
            issueFilterPage.disselectExcludeStreamOption('xml-fortran');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyFilterChipVisible('Streams');
            issueFilterPage.verifyTableHasResults();
        });

        it('Selecting another stream as any includes both streams and changes the table results accordingly', () => {
            issueFilterPage.clickFilterChip('Streams');
            issueFilterPage.searchIncludeStream('test');
            issueFilterPage.verifyOptionCountGreaterThan(0);
            issueFilterPage.selectNthOption(1);
            issueFilterPage.closeDialog();
            issueFilterPage.verifyTableHasResults();
        });

        it('Selecting all instead of any changes the chip label and table results', () => {
            issueFilterPage.clickFilterChip('Streams');
            issueFilterPage.clickStreamOptionSelector(1);
            issueFilterPage.selectStreamOption('all');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyTableDoesntHaveResults();
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
