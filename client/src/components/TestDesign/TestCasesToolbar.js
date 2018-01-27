import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class TestCasesToolbar extends React.Component {
    render() {
        const { testPlan } = this.props;
        return (<div className="toolbar">
            {testPlan
                ? <Link to={`/design/testplan/${testPlan.id}/testcase/add`} className="btn btn-link">
                    <i className="glyphicon glyphicon-plus" />
                    {" "}
                    New
                </Link>
                : null}
            <h3 className="header-gradient-1">
                Test Cases
                {testPlan ? " - " + testPlan.name : ""}
            </h3>
        </div>);
    }
}
TestCasesToolbar.propTypes = {
    testPlan: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    })
};

export default TestCasesToolbar;
