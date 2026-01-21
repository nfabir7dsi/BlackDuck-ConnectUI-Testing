import sidebar from "../../../support/pages/Sidebar/sidebar";
import navbar from "../../../support/pages/Navbar/navbar";
import usersPage from "../../../support/pages/UsersPage/usersPage";

describe("Verify CRUD functionality for user", () => {
    const url = 'http://10.255.184.188:5173/ui';
    const validUsername = 'admin';
    const validPassword = 'C0ver1ty!';

    // Test data for creating a user
    const username = 'test10';
    const firstName = 'Test';
    const lastName = 'User';
    const email = 'test@user.com';
    const password = '123456';
    const confirmPassword = '123456';

    const updatedFirstName = 'Testing';

    beforeEach(() => {
        cy.visit(url);
        cy.wait(2000);
        cy.percySnapshot('Login Page');
        cy.login(validUsername, validPassword);
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
          
        // cy.session("adminLogin", () => {
        //     cy.visit(url);
        //     cy.login(validUsername, validPassword);
        // });

        // cy.then(() => {
        //     cy.visit(url + '/projects');
        // });
    });

    it("Verify creating a user", () => {
        
        usersPage.clickCreateUserPageButton()                // Go to Create User Page
            .verifyCreateUserPageHeader('Create user')
            .enterUsername(username)                         // Create User
            .enterFirstName(firstName)
            .enterLastName(lastName)
            .enterEmail(email)
            .enterPassword(password)
            .enterConfirmPassword(confirmPassword)
            .clickCreateUserButton(true)
            .verifySuccessNotification();
    });

    it("Verify reading user details", () => {

        usersPage.clickSearchButton()                        // Search for created user
            .enterSearchInput(username)
            .verifyCreatedUsername(username)                 // Read User details from table
            .verifyCreatedUserDomain('Local')
            .verifyCreatedUserFirstName(firstName)
            .verifyCreatedUserLastName(lastName)
            .verifyCreatedUserGroups('Users');
    });

    it("Verify updating user details", () => {
        
        usersPage.clickSearchButton()                        // Search for created user
            .enterSearchInput(username)
            .clickOnCreatedUser()                            // Go to Edit User Page and update details
            .verifyEditUserPageHeader(username)
            .verifyFirstNameInput(firstName)
            .editFirstName(updatedFirstName)
            .clickUpdateUserButton()
            .verifySuccessNotification()
            .clickSearchButton()                             // Verify updated details
            .enterSearchInput(username)
            .verifyCreatedUserFirstName(updatedFirstName);                
    });

    it("Verfiy deleting the user", () => {
        usersPage.clickSearchButton()                        // Search for created user
            .enterSearchInput(username)
            .clickDeleteButton()                             // Delete the created user
            .verifyModalVisibility()
            .clickConfirmDeleteButton()
            .verifySuccessNotification()
            .clickSearchButton()                             // Verify user deletion
            .enterSearchInput(username)
            .verifyUserDeletion('No results');
    });

});