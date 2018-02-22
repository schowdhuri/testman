import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class DefectToolbar extends React.Component {
    render() {
        return (<div className="toolbar">
            <Link to={`/defects/add`} className="btn btn-link">
                <i className="glyphicon glyphicon-plus" />
                {" "}
                New
            </Link>
            <h3 className="header-gradient-1">Defects</h3>
        </div>);
    }
}
DefectToolbar.propTypes = {

};

export default DefectToolbar;
