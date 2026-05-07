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
        it('Show Classification column if not visible', () => {
            issuePage.showColumnIfNotVisible('classification-column', 'Classification');
        });

        it('Adding Classification filter opens the dialog, dialog shows all expected options', () => {
            issueFilterPage.addFilter('Classification');
            issueFilterPage.verifyFilterDialogVisible();
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
            // issueFilterPage.verifyTableHasRowCount(4);
            issuePage.verifyRecordCount('4');
            issueFilterPage.verifyColumnCellsContain('classification-column', 'Bug');
        });

        it('Selecting multiple options shows OR logic results', () => {
            issueFilterPage.clickFilterChip('Classification');
            issueFilterPage.selectOption('Pending');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyTableHasResults();
            // issueFilterPage.verifyTableHasRowCount(8);
            issuePage.verifyRecordCount('8');
            issueFilterPage.verifyColumnCellsContain('classification-column', ['Bug', 'Pending']);
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

        it('Deselecting all options removes the filter from the filter bar', () => {
            issueFilterPage.selectOption('Bug');
            issueFilterPage.selectOption('Pending');
            issueFilterPage.verifyFilterChipNotExists('Classification');
            // issueFilterPage.closeDialog();
            // issueFilterPage.verifyChipLabelContains('Classification', '=');
        });

        it('Pressing Escape closes the dialog', () => {
            issueFilterPage.addFilter('Classification');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Classification', '=');
        });

        it('Clicking outside the dialog closes it', () => {
            issueFilterPage.clickFilterChip('Classification');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.clickOutsideDialog();
            issueFilterPage.verifyChipLabelContains('Classification', '=');
        });

        it('Cleanup: remove Classification filter', () => {
            issueFilterPage.removeFilter('Classification');
            issueFilterPage.verifyFilterChipNotExists('Classification');
        });
    });

    // ── Status — Spot Check ───────────────────────────────────────────────

    describe('Status filter', () => {
        it('Show Status column if not visible', () => {
            issuePage.showColumnIfNotVisible('status-column', 'Status');
        });

        it('Adding Status filter shows correct options', () => {
            issueFilterPage.addFilter('Status');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyAllOptions(issueFilterObject.getStatusOptions());
            issueFilterPage.verifyOptionCount(issueFilterObject.getStatusOptions().length);
        });

        it('Selecting "New" updates chip and filters table', () => {
            issueFilterPage.selectOption('Triaged');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Status', 'Triaged');
            issueFilterPage.verifyTableHasResults();
            // issueFilterPage.verifyTableHasRowCount(8);
            issuePage.verifyRecordCount('8');
            issueFilterPage.verifyColumnCellsContain('status-column', 'Triaged');
        });

        it('Cleanup: remove Status filter', () => {
            issueFilterPage.removeFilter('Status');
        });
    });

    // ── Action — Spot Check ───────────────────────────────────────────────

    describe('Action filter', () => {
        it('Show Action column if not visible', () => {
            issuePage.showColumnIfNotVisible('action-column', 'Action');
        });

        it('Adding Action filter shows correct options', () => {
            issueFilterPage.addFilter('Action');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyAllOptions(issueFilterObject.getActionOptions());
            issueFilterPage.verifyOptionCount(issueFilterObject.getActionOptions().length);
        });

        it('Selecting "Fix Required" updates chip and filters table', () => {
            issueFilterPage.selectOption('Fix Required');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Action', 'Fix Required');
            issueFilterPage.verifyTableHasResults();
            // issueFilterPage.verifyTableHasRowCount(2);
            issuePage.verifyRecordCount('2');
            issueFilterPage.verifyColumnCellsContain('action-column', 'Fix Required');
        });

        it('Cleanup: remove Action filter', () => {
            issueFilterPage.removeFilter('Action');
        });
    });

    // ── Severity — Spot Check ─────────────────────────────────────────────

    describe('Severity filter', () => {
        it('Show Severity column if not visible', () => {
            issuePage.showColumnIfNotVisible('severity-column', 'Severity');
        });

        it('Adding Severity filter shows correct options', () => {
            issueFilterPage.addFilter('Severity');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyAllOptions(issueFilterObject.getSeverityOptions());
            issueFilterPage.verifyOptionCount(issueFilterObject.getSeverityOptions().length);
        });

        it('Selecting "Major" updates chip and filters table', () => {
            issueFilterPage.selectOption('Major');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Severity', 'Major');
            issueFilterPage.verifyTableHasResults();
            // issueFilterPage.verifyTableHasRowCount(3);
            issuePage.verifyRecordCount('3');
            issueFilterPage.verifyColumnCellsContain('severity-column', 'Major');
        });

        it('Cleanup: remove Severity filter', () => {
            issueFilterPage.removeFilter('Severity');
        });
    });

    // ── Impact — Spot Check ───────────────────────────────────────────────

    describe('Impact filter', () => {
        it('Show Impact column if not visible', () => {
            issuePage.showColumnIfNotVisible('displayImpact-column', 'Impact');
        });

        it('Adding Impact filter shows correct options', () => {
            issueFilterPage.addFilter('Impact');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyAllOptions(issueFilterObject.getImpactOptions());
            issueFilterPage.verifyOptionCount(issueFilterObject.getImpactOptions().length);
        });

        it('Selecting "Medium" updates chip and filters table', () => {
            issueFilterPage.selectOption('Medium');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Impact', 'Medium');
            issueFilterPage.verifyTableHasResults();
            // issueFilterPage.verifyTableHasRowCount(2);
            issuePage.verifyRecordCount('2');
            issueFilterPage.verifyColumnCellsContain('displayImpact-column', 'Medium');
        });

        it('Cleanup: remove Impact filter', () => {
            issueFilterPage.removeFilter('Impact');
        });
    });

    // ── Issue Kind — Spot Check ───────────────────────────────────────────

    describe('Issue Kind filter', () => {
        // it('Show Issue Kind column if not visible', () => {
        //     issuePage.showColumnIfNotVisible('issueKind-column', 'Issue Kind');
        // });

        it('Adding Issue Kind filter shows correct options', () => {
            issueFilterPage.addFilter('Issue Kind');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyAllOptions(issueFilterObject.getIssueKindOptions());
            issueFilterPage.verifyOptionCount(issueFilterObject.getIssueKindOptions().length);
        });

        it('Selecting "Quality" updates chip and filters table', () => {
            issueFilterPage.selectOption('Quality');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Issue Kind', 'Quality');
            issueFilterPage.verifyTableHasResults();
        });

        it('Cleanup: remove Issue Kind filter', () => {
            issueFilterPage.removeFilter('Issue Kind');
        });
    });

    // ── Legacy — Spot Check ───────────────────────────────────────────────

    describe('Legacy filter', () => {
        // it('Show Legacy column if not visible', () => {
        //     issuePage.showColumnIfNotVisible('legacy-column', 'Legacy');
        // });

        it('Adding Legacy filter shows correct options', () => {
            issueFilterPage.addFilter('Legacy');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyAllOptions(issueFilterObject.getLegacyOptions());
            issueFilterPage.verifyOptionCount(issueFilterObject.getLegacyOptions().length);
        });

        it('Selecting "False" updates chip and filters table', () => {
            issueFilterPage.selectOption('False');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Legacy', 'False');
            issueFilterPage.verifyTableHasResults();
        });

        it('Cleanup: remove Legacy filter', () => {
            issueFilterPage.removeFilter('Legacy');
        });
    });

    // ── Fix Target — Spot Check ───────────────────────────────────────────

    describe('Fix Target filter', () => {
        // it('Show Fix Target column if not visible', () => {
        //     issuePage.showColumnIfNotVisible('fixTarget-column', 'Fix Target');
        // });

        it('Adding Fix Target filter shows correct options', () => {
            issueFilterPage.addFilter('Fix Target');
            issueFilterPage.verifyFilterDialogVisible();
            issueFilterPage.verifyAllOptions(issueFilterObject.getFixTargetOptions());
            issueFilterPage.verifyOptionCount(issueFilterObject.getFixTargetOptions().length);
        });

        it('Selecting "Untargeted" updates chip and filters table', () => {
            issueFilterPage.selectOption('Untargeted');
            issueFilterPage.closeDialog();
            issueFilterPage.verifyChipLabelContains('Fix Target', 'Untargeted');
            issueFilterPage.verifyTableHasResults();
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
