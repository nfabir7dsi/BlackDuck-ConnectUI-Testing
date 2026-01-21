class CreateUserObject {
    createUserPageHeader = 'page-title';

    // Input fields
    username = 'userName';
    firstname = 'firstName';
    lastname = 'lastName';
    email = 'email';
    password = 'password';
    confirmPassword = 'confirmPassword';

    createUserButton = 'create-user';

    usernameFieldError = 'label:contains("Username") ~ p[role="alert"]';
    passwordFieldError = 'label:contains("Password") ~ p[role="alert"]';
    passwordMismatchError = '#password-mismatch-error';

    getCreateUserPageHeader() {
        return this.createUserPageHeader;
    }

    getUsernameInput() {
        return this.username;
    }
    getFirstNameInput() {
        return this.firstname;
    }
    getLastNameInput() {
        return this.lastname;
    }
    getEmailInput() {
        return this.email;
    }
    getPasswordInput() {
        return this.password;
    }
    getConfirmPasswordInput() {
        return this.confirmPassword;
    }

    getCreateUserButton() {
        return this.createUserButton;
    }

    getUsernameFieldError() {
        return this.usernameFieldError;
    }
    getPasswordFieldError() {
        return this.passwordFieldError;
    }
    getPasswordMismatchError() {
        return this.passwordMismatchError;
    }
}

export default new CreateUserObject();