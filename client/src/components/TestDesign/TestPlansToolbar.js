import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class TestPlansToolbar extends React.Component {
    render() {
        return (<div className="toolbar">
            <a className="btn btn-link">
                <i className="glyphicon glyphicon-plus" />
                {" "}
                New
            </a>
            <h3 className="header-gradient-1">Test Plans</h3>
        </div>);
    }
}

export default TestPlansToolbar;
