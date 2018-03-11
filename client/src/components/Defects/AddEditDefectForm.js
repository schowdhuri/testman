import React from "react";
import PropTypes from "prop-types";
import {
    Col,
    ControlLabel,
    DropdownButton,
    FormControl,
    FormGroup,
    MenuItem,
    Row
} from "react-bootstrap";

import DEF_STATES from "common/constants/DefectStates";
import DEF_COLORS from "constants/DefectStateColors";

import Description from "components/Shared/Description";
import Title from "components/Shared/Title";

const AddEditDefectForm = props => {
    const {
        assignee,
        defectId,
        description,
        name,
        onChangeAssignee,
        onChangeName,
        onChangeDescription,
        onChangeStatus,
        status,
        users
    } = props;

    const handleChangeDescription = ev => onChangeDescription(ev.target.value);
    const handleChangeStatus = val => onChangeStatus
        ? onChangeStatus(val)
        : {};
    const handleChangeAssignee = val => onChangeAssignee
        ? onChangeAssignee(val)
        : {};

    return (<React.Fragment>
        <Row>
            <Col md={10}>
                <Title placeholder="Name" onUpdate={onChangeName} value={name} />
            </Col>
            <Col md={2} className="text-right">
                {defectId
                    ? <DropdownButton
                        bsStyle={DEF_COLORS[status]}
                        bsSize="small"
                        title={status}
                        id="status-dd"
                    >
                        {DEF_STATES.map(s => (<MenuItem
                            key={s}
                            onSelect={() => handleChangeStatus(s)}
                        >{s}</MenuItem>))}
                    </DropdownButton>
                    : null}
            </Col>
        </Row>
         <Row>
            <Col md={10}>
                <Description
                    placeholder="Description"
                    onUpdate={onChangeDescription}
                    value={description} />
            </Col>
            <Col md={2} className="assignee text-right">
                {users
                    ? <DropdownButton
                        bsSize="small"
                        title={assignee && assignee.name || "< Unassigned >"}
                        id="assignee-dd"
                    >
                        {users.map(u => (<MenuItem
                            key={`assignee-${u.id}`}
                            onSelect={() => handleChangeAssignee(u)}
                        >{u.name}</MenuItem>))}
                    </DropdownButton>
                    : null}
            </Col>
        </Row>
    </React.Fragment>);
};
AddEditDefectForm.propTypes = {
    description: PropTypes.string,
    name: PropTypes.string,
    onChangeDescription: PropTypes.func.isRequired,
    onChangeName: PropTypes.func.isRequired
};

export default AddEditDefectForm;
