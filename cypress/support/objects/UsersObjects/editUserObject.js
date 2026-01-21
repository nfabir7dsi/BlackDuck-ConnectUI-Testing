class EditUserObject {
    editPageHeader = 'page-title';

    username = 'userName';
    firstname = 'firstName';
    lastname = 'lastName';
    email = 'email';
    password = 'password';
    confirmPassword = 'confirmPassword';

    updateUserButton = 'update-user';
    resetFormButton = 'reset-form';
    cancelButton = 'cancel';
    

    getEditPageHeader() {
        return this.editPageHeader;
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

    getUpdateUserButton() {
        return this.updateUserButton;
    }
    getResetFormButton() {
        return this.resetFormButton;
    }
    getCancelButton() {
        return this.cancelButton;
    }
}

export default new EditUserObject();