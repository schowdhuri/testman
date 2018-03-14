import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class TestCasesToolbar extends React.Component {
    render() {
        const { onUpload, testPlan } = this.props;
        return (<div className="toolbar">
            {testPlan
                ? <React.Fragment>
                    <Link to={`/design/testplan/${testPlan.id}/testcase/add`} className="btn btn-link">
                        <i className="glyphicon glyphicon-plus text-info" />
                        {" "}
                        <span className="text-info">New</span>
                    </Link>
                    <button className="btn btn-link" onClick={onUpload}>
                        <i className="glyphicon glyphicon-open text-info" />
                        {" "}
                        <span className="text-info">Upload</span>
                    </button>
                </React.Fragment>
                : null}
            <h3 className="header-gradient-1">
                Test Cases
                {testPlan ? " - " + testPlan.name : ""}
            </h3>
        </div>);
    }
}
TestCasesToolbar.propTypes = {
    onUpload: PropTypes.func.isRequired,
    testPlan: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    })
};

export default TestCasesToolbar;
