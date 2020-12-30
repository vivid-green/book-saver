import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink } from "mdbreact";

class Navbar extends Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

render() {
  return (
      <MDBNavbar color="default-color" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">Book Saver</strong>
        </MDBNavbarBrand>
          <MDBNavbarNav left>
            <MDBNavItem>
              <MDBNavLink to="/">Search</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/saved">Saved</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
      </MDBNavbar>
    );
  }
}

export default Navbar;