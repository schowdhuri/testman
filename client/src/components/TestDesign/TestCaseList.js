import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
    Table
} from "react-bootstrap";

import TestCasesToolbar from "./TestCasesToolbar";
import UploadTestCases from "./UploadTestCases";

class TestCaseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showUploadTestCases: false
        };
        this.handleUploadTestCases = this.handleUploadTestCases.bind(this);
        this.hideUploadTestCases = this.hideUploadTestCases.bind(this);
        this.showUploadTestCases = this.showUploadTestCases.bind(this);
    }
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
    handleUploadTestCases(file) {
        console.log("Upload: ", file);
        this.props.onUploadTests(this.props.testPlan.id, file);
        this.hideUploadTestCases();
    }
    hideUploadTestCases(fie) {
        this.setState({ showUploadTestCases: false });
    }
    showUploadTestCases() {
        this.setState({ showUploadTestCases: true });
    }
    render() {
        const {
            testCases,
            testPlan
        } = this.props;
        const { showUploadTestCases } = this.state;
        return (<div className="tests-list">
            <TestCasesToolbar testPlan={testPlan} onUpload={this.showUploadTestCases} />
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
            <UploadTestCases
                show={showUploadTestCases}
                onCancel={this.hideUploadTestCases}
                onUpload={this.handleUploadTestCases} />
        </div>);
    }
}

export default TestCaseList;
