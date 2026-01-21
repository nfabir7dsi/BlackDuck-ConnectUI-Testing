import navbar from "../../../support/pages/Navbar/navbar";
import sidebar from "../../../support/pages/Sidebar/sidebar";
import usersPage from "../../../support/pages/UsersPage/usersPage";

describe("Verify all the user creation", () => {
    const url = 'http://10.255.184.188:5173/ui';
    const validUsername = 'admin';
    const validPassword = 'C0ver1ty!';
    // const validPassword = 'string';

    const username = "test10";
    const password = "123456";
    const confirmPassword = "123456";
    const shortPassword = "123";

    beforeEach(() => {
        cy.visit(url);
        // cy.wait(5000);
        cy.login(validUsername, validPassword);
        navbar.clickSidebarToggleButton();                                          // Open Sidebar
        
        sidebar.verifyBlackDuckLogo()                                               // Verify Sidebar visibility
            .verifySidebarVisibility()
            .clickOnUserManagementMenu()                                            // Navigate to Users Page
            .clickOnUsersTab()
            .verifyUsersPageHeader('Users');                                        // Verify Users Page Header
    });

    it ("Verify user can't be created without mandatory fields", () => {
        usersPage.clickCreateUserPageButton()                                       // Go to Create User Page
            .verifyCreateUserPageHeader('Create user')
            .clickCreateUserButton(false)
            .verifyUsernameFieldError("A unique username is required.");            // Verify Username field error
    });

    it ("Verify user can't be created using previously used username", () => {
        cy.on('uncaught:exception', (err) => {                                      // Handle ApiError exception
            if (err.name === "ApiError") {
            return false;
            }
        });
        usersPage.clickCreateUserPageButton()                                       // Go to Create User Page
            .verifyCreateUserPageHeader('Create user')
            .enterUsername(username)                                                // Create User
            .enterPassword(password)
            .enterConfirmPassword(confirmPassword)
            .clickCreateUserButton(true)
            .verifySuccessNotification()
            .verifyUsersPageHeader('Users')
            .clickCreateUserPageButton()                                            // Go to Create User Page again
            .verifyCreateUserPageHeader('Create user')
            .enterUsername(username)                                                // Put same username
            .enterPassword(password)
            .enterConfirmPassword(confirmPassword)
            .clickCreateUserButton(false)                         
            .verifyUsernameFieldError("username already exists");                   // Verify Username field error    
    });

    it ("Verify password outside of the constraints doesn't get accepted", () => {
        usersPage.clickCreateUserPageButton()                                       // Go to Create User Page
            .verifyCreateUserPageHeader('Create user')
            .enterUsername(username)                                                
            .enterPassword(shortPassword)                                           // Put short Password
            .enterConfirmPassword(shortPassword)
            .clickCreateUserButton(false)                         
            .verifyPasswordFieldError("Must be a minimum of 6 characters");         // Verify Password field error
    });

    it ("Verify mismatched passwords gives an error", () => {
        usersPage.clickCreateUserPageButton()                                       // Go to Create User Page
            .verifyCreateUserPageHeader('Create user')
            .enterUsername(username)                         
            .enterPassword(password)                          
            .enterConfirmPassword(shortPassword)                                    // Put mismatched Confirm Password
            .clickCreateUserButton(false)                         
            .verifyPasswordMismatchError("Passwords do not match");                 // Verify Confirm Password field error 
    });

    it ("Delete the created user", () => {
        usersPage.clickSearchButton()                                               // Search for created user
            .enterSearchInput(username)
            .clickDeleteButton()                                                    // Delete the created user
            .verifyModalVisibility()
            .clickConfirmDeleteButton()
            .verifySuccessNotification()
            .clickSearchButton()                                                    // Verify user deletion
            .enterSearchInput(username)
            .verifyUserDeletion('No results');
    });
});