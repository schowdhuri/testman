import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const LinkedTest = props => {
    const {
        allowDelete=true,
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
            <Link
                to={`/design/testplan/${testPlan}/testcase/edit/${id}`}
                target="_blank"
                className="text-info"
            >
                TC-{id}
                {" "}
                <i className="glyphicon glyphicon-share" />
            </Link>
        </td>
        <td className="test-name">{name}</td>
        {allowDelete
            ? <td>
                <Button bsStyle="link" className="btn-delete-test" onClick={deleteTestCase}>
                    <i className="glyphicon glyphicon-trash text-danger" />
                </Button>
            </td>
            : null}
    </tr>);
};
LinkedTest.propTypes = {
    allowDelete: PropTypes.bool,
    onDelete: PropTypes.func,
    testCase: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        testPlan: PropTypes.number.isRequired
    }).isRequired
};

export default LinkedTest;
