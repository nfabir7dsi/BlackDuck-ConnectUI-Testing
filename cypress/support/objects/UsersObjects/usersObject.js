class UserObjet {
    usersHeader = 'page-title';
    createUserPageButton = 'create-user-button';
    searchButton = 'search-button';
    searchInput = 'search-input';

    noResultsText = 'no-result';

    usernameCell = 'row-0-name-column';
    domainCell = 'row-0-domainName-column';
    firstNameCell = 'row-0-givenName-column';
    lastNameCell = 'row-0-familyName-column';
    groupsCell = 'row-0-groupNames-column';

    deleteButton = 'action-1';
    deleteModal = 'div[role="dialog"]';
    deleteButtonModal = 'delete-user-modal-confirm-button';
    cancelDeleteButtonModal = 'delete-user-modal-cancel-button';

    getUsersHeader() {
        return this.usersHeader;
    }
    getCreateUserPageButton() {
        return this.createUserPageButton;
    }
    getSearchButton() {
        return this.searchButton;
    }
    getSearchInput() {
        return this.searchInput;
    }

    getUsernameCell() {
        return this.usernameCell;
    }
    getDomainCell() {
        return this.domainCell;
    }
    getFirstNameCell() {
        return this.firstNameCell;
    }
    getLastNameCell() {
        return this.lastNameCell;
    }
    getGroupsCell() {
        return this.groupsCell;
    }

    getNoResultsText() {
        return this.noResultsText;
    }

    getDeleteButton() {
        return this.deleteButton;
    }
    getDeleteModal() {
        return this.deleteModal;
    }
    getDeleteButtonModal() {
        return this.deleteButtonModal;
    }
    getCancelDeleteButtonModal() {
        return this.cancelDeleteButtonModal;
    }
}

export default new UserObjet();