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
        it('Show File column if not visible', () => {
            issuePage.showColumnIfNotVisible('displayFile-column', 'File');
        });

        it('Opening File dialog shows input with wildcard hint', () => {
            issueFilterPage.addFilter('File');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyFilterDialogContains('*');
            issueFilterPage.verifyFilterDialogContains('?');
        });

        it('Entering exact text updates chip and filters table', () => {
            issueFilterPage.enterFilterValue('*.inc');
            issueFilterPage.verifyChipLabelContains('File', '*.inc');
            issueFilterPage.verifyTableHasResults();
            issuePage.verifyRecordCount('55');
            // issueFilterPage.verifyColumnCellsContain('displayFile-column', '*.inc');
        });

        it('Entering * wildcard matches broadly', () => {
            issueFilterPage.clickFilterChip('File');
            issueFilterPage.enterFilterValue('*');
            issueFilterPage.verifyChipLabelContains('File', '*');
            issueFilterPage.verifyTableHasResults();
        });

        it('Entering text with no matches shows empty table', () => {
            issueFilterPage.clickFilterChip('File');
            issueFilterPage.enterFilterValue('nonexistentfile_xyz_12345.zzz');
            issueFilterPage.verifyTableDoesntHaveResults();
        });

        it('Clearing input removes the filter effect', () => {
            issueFilterPage.clickFilterChip('File');
            issueFilterPage.clearFilterInput();
            issueFilterPage.verifyFilterChipNotExists('File');
        });
    });

    // ── Function — Full Coverage ──────────────────────────────────────────

    describe('Function filter', () => {
        it('Show Function column if not visible', () => {
            issuePage.showColumnIfNotVisible('displayFunction-column', 'Function');
        });

        it('Opening Function dialog shows input with wildcard hint', () => {
            issueFilterPage.addFilter('Function');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyFilterDialogContains('*');
        });

        it('Entering exact text updates chip and filters table', () => {
            issueFilterPage.enterFilterValue('CONVERT_ATTRIB');
            issueFilterPage.verifyChipLabelContains('Function', 'CONVERT_ATTRIB');
            issueFilterPage.verifyTableHasResults();
            issuePage.verifyRecordCount('4');
            issueFilterPage.verifyColumnCellsContain('displayFunction-column', 'CONVERT_ATTRIB');
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
        // it('Show Owner Name column if not visible', () => {
        //     issuePage.showColumnIfNotVisible('ownerName-column', 'Owner Name');
        // });

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
        // it('Show External Reference column if not visible', () => {
        //     issuePage.showColumnIfNotVisible('externalReference-column', 'External Reference');
        // });

        it('Opening External Reference dialog shows wildcard hint', () => {
            issueFilterPage.addFilter('External Reference');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyFilterDialogContains('*');
        });

        it('Entering a value updates the chip and filters table', () => {
            issueFilterPage.enterFilterValue('*');
            issueFilterPage.verifyChipLabelContains('External Reference', '*');
            issueFilterPage.verifyTableDoesntHaveResults();
        });

        it('Cleanup: remove External Reference filter', () => {
            issueFilterPage.removeFilter('External Reference');
        });
    });

    // ── Merge Key — Spot Check ────────────────────────────────────────────

    describe('Merge Key filter', () => {
        it('Show Merge Key column if not visible', () => {
            issuePage.showColumnIfNotVisible('mergeKey-column', 'Merge Key');
        });

        it('Opening Merge Key dialog shows wildcard hint', () => {
            issueFilterPage.addFilter('Merge Key');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyFilterDialogContains('*');
        });

        it('Entering a value updates the chip and filters table', () => {
            issueFilterPage.enterFilterValue('cc92da3a1f62b36227a4cc10d5126969');
            issueFilterPage.verifyChipLabelContains('Merge Key', 'cc92da3a1f62b36227a4cc10d5126969');
            issueFilterPage.verifyTableHasResults();
            issuePage.verifyRecordCount('1');
            issueFilterPage.verifyColumnCellsContain('mergeKey-column', 'cc92da3a1f62b36227a4cc10d5126969');
        });

        it('Cleanup: remove Merge Key filter', () => {
            issueFilterPage.removeFilter('Merge Key');
        });
    });

    // ── Merge Extra — Spot Check ──────────────────────────────────────────

    describe('Merge Extra filter', () => {
        it('Show Merge Extra column if not visible', () => {
            issuePage.showColumnIfNotVisible('mergeExtra-column', 'Merge Extra');
        });

        it('Opening Merge Extra dialog shows wildcard hint', () => {
            issueFilterPage.addFilter('Merge Extra');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyFilterDialogContains('*');
        });

        it('Entering a value updates the chip and filters table', () => {
            issueFilterPage.enterFilterValue('all');
            issueFilterPage.verifyChipLabelContains('Merge Extra', 'all');
            issueFilterPage.verifyTableHasResults();
            issuePage.verifyRecordCount('1');
            issueFilterPage.verifyColumnCellsContain('mergeExtra-column', 'all');
        });

        it('Cleanup: remove Merge Extra filter', () => {
            issueFilterPage.removeFilter('Merge Extra');
        });
    });

    // ── Function Merge Name — Spot Check ──────────────────────────────────

    describe('Function Merge Name filter', () => {
        it('Show Function Merge Name column if not visible', () => {
            issuePage.showColumnIfNotVisible('functionMergeName-column', 'Function Merge Name');
        });

        it('Opening Function Merge Name dialog shows wildcard hint', () => {
            issueFilterPage.addFilter('Function Merge Name');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyFilterDialogContains('*');
        });

        it('Entering a value updates the chip and filters table', () => {
            issueFilterPage.enterFilterValue('CONVERT_ELEM');
            issueFilterPage.verifyChipLabelContains('Function Merge Name', 'CONVERT_ELEM');
            issueFilterPage.verifyTableHasResults();
            issuePage.verifyRecordCount('4');
            issueFilterPage.verifyColumnCellsContain('functionMergeName-column', 'CONVERT_ELEM');
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
