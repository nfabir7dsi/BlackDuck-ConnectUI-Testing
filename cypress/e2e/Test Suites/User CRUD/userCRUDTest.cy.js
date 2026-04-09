import sidebar from "../../../support/pages/Sidebar/sidebar";
import navbar from "../../../support/pages/Navbar/navbar";
import usersPage from "../../../support/pages/UsersPage/usersPage";

describe("Verify CRUD functionality for user", () => {
    let data;

    beforeEach(() => {
        cy.fixture('coverity').then((fixture) => {
            data = fixture;
            cy.visit(data.baseURL);
            cy.wait(10000);
            // cy.percySnapshot('Login Page');
            cy.login(data.validUser.username, data.validUser.password);
        });
        navbar.clickSidebarToggleButton();                  // Open Sidebar
        cy.wait(2000);
        cy.percySnapshot('Projects Page with Sidebar Open');

        sidebar.verifyBlackDuckLogo()                       // Verify Sidebar visibility
            .verifySidebarVisibility()
            .clickOnUserManagementMenu()                    // Navigate to Users Page
            .clickOnUsersTab()
            .verifyUsersPageHeader('Users')                 // Verify Users Page Header

        cy.wait(2000);
        cy.percySnapshot('Users Page');
    });

    it("Verify creating a user", () => {

        usersPage.clickCreateUserPageButton()                // Go to Create User Page
            .verifyCreateUserPageHeader('Create user')
            .enterUsername(data.newUser.username)            // Create User
            .enterFirstName(data.newUser.firstName)
            .enterLastName(data.newUser.lastName)
            .enterEmail(data.newUser.email)
            .enterPassword(data.newUser.password)
            .enterConfirmPassword(data.newUser.confirmPassword)
            .clickCreateUserButton(true)
            .verifySuccessNotification();
    });

    it("Verify reading user details", () => {

        usersPage.clickSearchButton()                        // Search for created user
            .enterSearchInput(data.newUser.username)
            .verifyCreatedUsername(data.newUser.username)    // Read User details from table
            .verifyCreatedUserDomain('Local')
            .verifyCreatedUserFirstName(data.newUser.firstName)
            .verifyCreatedUserLastName(data.newUser.lastName)
            .verifyCreatedUserGroups('Users');
    });

    it("Verify updating user details", () => {

        usersPage.clickSearchButton()                        // Search for created user
            .enterSearchInput(data.newUser.username)
            .clickOnCreatedUser()                            // Go to Edit User Page and update details
            .verifyEditUserPageHeader(data.newUser.username)
            .verifyFirstNameInput(data.newUser.firstName)
            .editFirstName(data.newUser.updatedFirstName)
            .clickUpdateUserButton()
            .verifySuccessNotification()
            .clickSearchButton()                             // Verify updated details
            .enterSearchInput(data.newUser.username)
            .verifyCreatedUserFirstName(data.newUser.updatedFirstName);
    });

    it("Verfiy deleting the user", () => {
        usersPage.clickSearchButton()                        // Search for created user
            .enterSearchInput(data.newUser.username)
            .clickDeleteButton()                             // Delete the created user
            .verifyModalVisibility()
            .clickConfirmDeleteButton()
            .verifySuccessNotification()
            .clickSearchButton()                             // Verify user deletion
            .enterSearchInput(data.newUser.username)
            .verifyUserDeletion('No results');
    });

});
