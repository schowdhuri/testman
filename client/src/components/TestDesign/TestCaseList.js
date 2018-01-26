import React from "react";
import PropTypes from "prop-types";
import {
    Table
} from "react-bootstrap";
import { Link } from "react-router-dom";

class TestCaseList extends React.Component {
    componentDidMount() {
        this.props.fetchTestCases();
    }
    render() {
        const { testCases } = this.props;
        return (<div>
            <Table striped condensed hover>
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Defects</th>
                        <th>Comments</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {testCases.map(tc => (<tr key={`tc-${tc.id}`}>
                        <td>{tc.id}</td>
                        <td>{tc.name}</td>
                        <td>{tc.status}</td>
                        <td>{tc.defects ? tc.defects.length : 0}</td>
                        <td>{tc.comments ? tc.comments.length : 0}</td>
                        <td>
                            <Link to={`design/testcase/${tc.id}`}>View</Link>
                        </td>
                    </tr>))}
                </tbody>
            </Table>
        </div>);
    }
}

export default TestCaseList;
