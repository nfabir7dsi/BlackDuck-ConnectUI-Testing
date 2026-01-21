import navbarObject from "../../objects/NavbarObjects/navbarObject";

class Navbar {
    clickSidebarToggleButton() {
        cy.get(navbarObject.getSidebarToggleButton()).click();
    }
}

export default new Navbar();