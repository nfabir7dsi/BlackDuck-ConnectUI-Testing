class LoginObjects {
    usernameInput = 'input[name="username"]';
    passwordInput = 'input[name="password"]';
    loginButton = 'button[type="submit"]';

    errormessage = 'error-message';
    label = 'label';

    loginPageHeader = '[data-testid="blackduck-coverity-title"]';

    getUsernameInput() {
        return this.usernameInput;
    }

    getPasswordInput() {
        return this.passwordInput;
    }

    getLoginButton() {
        return this.loginButton;
    }

    getErrorMessage() {
        return this.errormessage;
    }

    getLabel() {
        return this.label;
    }

    getLoginPageHeader() {
        return this.loginPageHeader;
    }
}

export default new LoginObjects();