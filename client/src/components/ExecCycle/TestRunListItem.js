import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
    DropdownButton,
    MenuItem
} from "react-bootstrap";

import TR_STATES from "constants/TestRunStates";
import TR_COLORS from "constants/TestRunStateColors";

const TestRun = props => {
    const {
        allowChangeStatus,
        execCycleId,
        onChangeStatus,
        onToggle,
        testRun
    } = props;

    const handleToggle = ev => {
        onToggle(testRun, ev.target.checked);
    };

    const handleChangeStatus = newStatus => {
        onChangeStatus(testRun, newStatus);
    };

    return (<tr>
        <td>
            <input
                type="checkbox"
                checked={testRun.selected}
                onChange={handleToggle} />
        </td>
        <td>{`TC-${testRun.testCase}`}</td>
        <td>
            <Link to={`/execution/${execCycleId}/test/${testRun.id}`}>{testRun.name}</Link>
        </td>
        <td>
            {allowChangeStatus
                ? <DropdownButton
                    bsStyle={TR_COLORS[testRun.status]}
                    bsSize="xsmall"
                    title={testRun.status}
                    id={`tr-${testRun.id}-status-dd`}
                >
                    {TR_STATES.map(s => (<MenuItem
                        key={s}
                        onSelect={() => handleChangeStatus(s)}
                    >{s}</MenuItem>))}
                </DropdownButton>
                : testRun.status}
        </td>
        <td>{testRun.defects ? testRun.defects.length : 0}</td>
        <td>{testRun.comments ? testRun.comments.length : 0}</td>
    </tr>);
};
TestRun.propTypes = {

};

export default TestRun;
