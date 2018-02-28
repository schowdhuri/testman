import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
    Table
} from "react-bootstrap";

import TestCasesToolbar from "./TestCasesToolbar";

class TestCaseList extends React.Component {
    componentDidMount() {
        if(this.props.testPlan && this.props.testPlanID == this.props.testPlan.id)
            this.props.fetchTestCases(this.props.testPlan);
    }
    componentWillReceiveProps(nextProps) {
        if((nextProps.testPlan != this.props.testPlan ||
            (nextProps.testPlan && this.props.testPlan && nextProps.testPlan.id != this.props.testPlan.id))
        ) {
            this.props.fetchTestCases(nextProps.testPlan);
        }
    }
    render() {
        const {
            testCases,
            testPlan
        } = this.props;
        return (<div className="tests-list">
            <TestCasesToolbar testPlan={testPlan} />
            <Table striped condensed hover className="data-grid ">
                <thead>
                    <tr>
                        <th className="test-id">ID</th>
                        <th>Test Case</th>
                        <th className="stats"></th>
                    </tr>
                </thead>
                <tbody>
                    {testCases.map(tc => (<tr key={`tc-${tc.id}`}>
                        <td>TC-{tc.id}</td>
                        <td>
                            <Link to={`/design/testplan/${testPlan.id}/testcase/edit/${tc.id}`}>{tc.name}</Link>
                        </td>
                        <td>
                            <div className={`test-stat ${!tc.defects.length ? "invisible" : ""}`} title="Defects">
                                <i className="glyphicon glyphicon-exclamation-sign text-danger" />
                                {" "}
                                {tc.defects.length}
                            </div>
                            <div className={`test-stat ${!tc.comments.length ? "invisible": ""}`} title="Comments">
                                <i className="glyphicon glyphicon-comment text-info" />
                                {" "}
                                {tc.comments.length}
                            </div>
                        </td>
                    </tr>))}
                </tbody>
            </Table>
        </div>);
    }
}

export default TestCaseList;
