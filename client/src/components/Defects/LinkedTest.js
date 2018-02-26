import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const LinkedTest = props => {
    const {
        testCase,
        onDelete
    } = props;

    const {
        id,
        name,
        testPlan
    } = testCase;

    const deleteTestCase = () => onDelete(id);

    return (<tr className="test-case">
        <td className="test-id">
            <Link to={`/design/testplan/${testPlan}/testcase/edit/${id}`}>TC-{id}</Link>
        </td>
        <td className="test-name">{name}</td>
        <td>
            <Button bsStyle="link" className="btn-delete-test" onClick={deleteTestCase}>
                <i className="glyphicon glyphicon-trash text-danger" />
            </Button>
        </td>
    </tr>);
};
LinkedTest.propTypes = {

};

export default LinkedTest;
