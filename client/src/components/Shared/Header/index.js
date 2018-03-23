import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";

import Logo from "common/images/TestMan.png";

const links = [{
    id: "dashboard",
    name: "Dashboard",
    url: "/"
}, {
    id: "design",
    name: "Test Design",
    url: "/design"
}, {
    id: "execution",
    name: "Execution Cycle",
    url: "/execution"
}, {
    id: "defects",
    name: "Defects",
    url: "/defects"
}/*, {
    id: "docs",
    name: "Documents",
    url: "/docs"
}*/];

class Header extends React.Component {
    render() {
        const { navId } = this.props;
        return (<header>
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <img src={Logo} alt="TestMan Logo" className="logo" />
                        <Link to="/">TestMan</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <ul className="nav navbar-nav">
                    {links.map(link => (<li
                        role="presentation"
                        key={link.id}
                        className={`${navId==link.id ? "active" : ""}`}
                    >
                        <Link to={link.url}>{link.name}</Link>
                    </li>))}
                </ul>
                <Nav pullRight>
                    <NavItem href="/auth/google">Login</NavItem>
                </Nav>
            </Navbar>
        </header>);
    }
}
Header.propTypes = {
    navId: PropTypes.string
};

export default Header;
