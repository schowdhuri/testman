import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";

class Header extends React.Component {
    render() {
        return (<header>
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">TestMan</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <ul className="nav navbar-nav">
                    <li role="presentation">
                        <Link to="/">Dashboard</Link>
                    </li>
                    <li role="presentation">
                        <Link to="/design">Test Design</Link>
                    </li>
                    <li role="presentation">
                        <Link to="/execution">Execution Cycle</Link>
                    </li>
                    <li role="presentation">
                        <Link to="/docs">Documents</Link>
                    </li>
                </ul>
            </Navbar>
        </header>);
    }
}
Header.propTypes = {

};

export default Header;
