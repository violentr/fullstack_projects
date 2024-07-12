import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { ReactComponent as Logo } from "../Images/logo.svg";

const navbarStyle = {
  backgroundColor: "#eeeeee",
};
const Header = ({ title }) => {
  return (
    <Navbar style={navbarStyle}>
      <Container>
        <Logo alt={title} style={{ maxWidth: "15rem", maxHeight: "3rem" }} />
      </Container>
    </Navbar>
  );
};

export default Header;
