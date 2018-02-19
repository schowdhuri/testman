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
                        <th>ID</th>
                        <th>Name</th>
                        <th>Defects</th>
                        <th>Comments</th>
                    </tr>
                </thead>
                <tbody>
                    {testCases.map(tc => (<tr key={`tc-${tc.id}`}>
                        <td>{tc.id}</td>
                        <td>
                            <Link to={`/design/testplan/${testPlan.id}/testcase/edit/${tc.id}`}>{tc.name}</Link>
                        </td>
                        <td>{tc.defects ? tc.defects.length : 0}</td>
                        <td>{tc.comments ? tc.comments.length : 0}</td>
                    </tr>))}
                </tbody>
            </Table>
        </div>);
    }
}

export default TestCaseList;
