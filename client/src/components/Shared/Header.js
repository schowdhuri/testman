import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";

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
}, {
    id: "docs",
    name: "Documents",
    url: "/docs"
}]

class Header extends React.Component {
    render() {
        const { routeName } = this.props;
        return (<header>
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">TestMan</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <ul className="nav navbar-nav">
                    {links.map(link => (<li
                        role="presentation"
                        key={link.id}
                        className={`${routeName == link.id ? "active" : ""}`}
                    >
                        <Link to={link.url}>{link.name}</Link>
                    </li>))}
                </ul>
            </Navbar>
        </header>);
    }
}
Header.propTypes = {

};

export default Header;
