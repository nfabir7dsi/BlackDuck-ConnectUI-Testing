import navbar from "../../../support/pages/Navbar/navbar";
import sidebar from "../../../support/pages/Sidebar/sidebar";
import usersPage from "../../../support/pages/UsersPage/usersPage";

describe("Verify all the user creation", () => {
    let data;

    beforeEach(() => {
        cy.fixture('coverity').then((fixture) => {
            data = fixture;
            cy.visit(data.baseURL);
            cy.login(data.validUser.username, data.validUser.password);
        });
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
            .enterUsername(data.newUser.username)                                   // Create User
            .enterPassword(data.newUser.password)
            .enterConfirmPassword(data.newUser.confirmPassword)
            .clickCreateUserButton(true)
            .verifySuccessNotification()
            .verifyUsersPageHeader('Users')
            .clickCreateUserPageButton()                                            // Go to Create User Page again
            .verifyCreateUserPageHeader('Create user')
            .enterUsername(data.newUser.username)                                   // Put same username
            .enterPassword(data.newUser.password)
            .enterConfirmPassword(data.newUser.confirmPassword)
            .clickCreateUserButton(false)
            .verifyUsernameFieldError("username already exists");                   // Verify Username field error
    });

    it ("Verify password outside of the constraints doesn't get accepted", () => {
        usersPage.clickCreateUserPageButton()                                       // Go to Create User Page
            .verifyCreateUserPageHeader('Create user')
            .enterUsername(data.newUser.username)
            .enterPassword(data.newUser.shortPassword)                              // Put short Password
            .enterConfirmPassword(data.newUser.shortPassword)
            .clickCreateUserButton(false)
            .verifyPasswordFieldError("Must be a minimum of 6 characters");         // Verify Password field error
    });

    it ("Verify mismatched passwords gives an error", () => {
        usersPage.clickCreateUserPageButton()                                       // Go to Create User Page
            .verifyCreateUserPageHeader('Create user')
            .enterUsername(data.newUser.username)
            .enterPassword(data.newUser.password)
            .enterConfirmPassword(data.newUser.shortPassword)                       // Put mismatched Confirm Password
            .clickCreateUserButton(false)
            .verifyPasswordMismatchError("Passwords do not match");                 // Verify Confirm Password field error
    });

    it ("Delete the created user", () => {
        usersPage.clickSearchButton()                                               // Search for created user
            .enterSearchInput(data.newUser.username)
            .clickDeleteButton()                                                    // Delete the created user
            .verifyModalVisibility()
            .clickConfirmDeleteButton()
            .verifySuccessNotification()
            .clickSearchButton()                                                    // Verify user deletion
            .enterSearchInput(data.newUser.username)
            .verifyUserDeletion('No results');
    });
});
