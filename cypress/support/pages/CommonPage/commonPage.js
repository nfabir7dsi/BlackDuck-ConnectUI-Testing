import commonObject from "../../objects/CommonObjects/commonObject";
import usersPage from "../UsersPage/usersPage";

class CommonPage {
    verifySuccessNotification() {
        cy.get(commonObject.getSuccessNotification()).should('be.visible');
        return usersPage;
    }
}

export default new CommonPage();