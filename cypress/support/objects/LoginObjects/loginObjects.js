class LoginObjects {
    usernameInput = 'input[name="username"]';
    passwordInput = 'input[name="password"]';
    loginButton = 'button[type="submit"]';

    errormessage = 'error-message';
    label = 'label';

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
}

export default new LoginObjects();