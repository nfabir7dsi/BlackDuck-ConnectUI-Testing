class SidebarObject {
    // Sidebar Header
    blackDuckLogo = 'img[alt="Black Duck Logo"]';
    sidebarHeader = 'img[alt="Black Duck Logo"] + div > h1';

    getBlackDuckLogo() {
        return this.blackDuckLogo;
    }
    getSidebarHeader() {
        return this.sidebarHeader;
    }

    // Projects & Hierarchies Menu and Tabs
    projectsMenu = 'projects-menu';
    projectsTab = 'projects';
    hierarchiesTab = 'hierarchies';

    getProjectsMenu() {
        return this.projectsMenu;
    }
    getProjectsTab() {
        return this.projectsTab;
    }   
    getHierarchiesTab() {
        return this.hierarchiesTab;
    }

    // Dashboards Menu and Tabs
    dashboardsMenu = 'dashboards-menu';
    qualityTab = 'quality';
    securityTab = 'security';

    getDashboardsMenu() {
        return this.dashboardsMenu;
    }
    getQualityTab() {
        return this.qualityTab;
    }
    getSecurityTab() {
        return this.securityTab;
    }

    // User Management Menu and Tabs
    userManagementMenu = 'user-management-menu';
    usersTab = 'users';
    groupsTab = 'groups';
    rolesTab = 'roles';

    getUserManagementMenu() {
        return this.userManagementMenu;
    }
    getUsersTab() {
        return this.usersTab;
    }
    getGroupsTab() {
        return this.groupsTab;
    }
    getRolesTab() {
        return this.rolesTab;
    }

    // Settings Menu and Tabs
    settingsMenu = 'settings-menu';
    accessTab = 'access';
    integrationsTab = 'integrations';
    configurationsTab = 'configurations';
    licensingTab = 'licensing';

    getSettingsMenu() {
        return this.settingsMenu;
    }
    getAccessTab() {
        return this.accessTab;
    }
    getIntegrationsTab() {
        return this.integrationsTab;
    }
    getConfigurationsTab() {
        return this.configurationsTab;
    }
    getLicensingTab() {
        return this.licensingTab;
    }

    // Help & Support Menu and Tabs
    helptSupportMenu = 'help-support-menu';
    helpCenterTab = 'help-center';
    documentationTab = 'documentation';
    aboutTab = 'about';
    diagnosticsTab = 'diagnostics';

    getHelpSupportMenu() {
        return this.helptSupportMenu;
    }
    getHelpCenterTab() {
        return this.helpCenterTab;
    }
    getDocumentationTab() {
        return this.documentationTab;
    }
    getAboutTab() {
        return this.aboutTab;
    }
    getDiagnosticsTab() {
        return this.diagnosticsTab;
    }

}

export default new SidebarObject();