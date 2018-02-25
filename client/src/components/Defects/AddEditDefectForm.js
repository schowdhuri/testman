import React from "react";
import PropTypes from "prop-types";
import {
    ControlLabel,
    DropdownButton,
    FormControl,
    FormGroup,
    MenuItem
} from "react-bootstrap";

import DEF_STATES from "common/constants/DefectStates";
import DEF_COLORS from "constants/DefectStateColors";

const AddEditDefectForm = props => {
    const {
        defectId,
        description,
        name,
        status,
        onChangeName,
        onChangeDescription,
        onChangeStatus
    } = props;

    const handleChangeName = ev => onChangeName(ev.target.value);
    const handleChangeDescription = ev => onChangeDescription(ev.target.value);
    const handleChangeStatus = val => onChangeStatus
        ? onChangeStatus(val)
        : {};

    return (<React.Fragment>
        <FormGroup controlId="name">
            <ControlLabel>Name</ControlLabel>
            <FormControl
                value={name}
                onChange={handleChangeName}
                type="text" />
        </FormGroup>
        <FormGroup controlId="description">
            <ControlLabel>Description</ControlLabel>
            <FormControl
                value={description}
                onChange={handleChangeDescription}
                componentClass="textarea" />
        </FormGroup>
        {defectId
            ? <FormGroup controlId="status">
                <ControlLabel className="defect-status">Status</ControlLabel>
                <DropdownButton
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
            </FormGroup>
            : null}
    </React.Fragment>);
};
AddEditDefectForm.propTypes = {
    description: PropTypes.string,
    name: PropTypes.string,
    onChangeDescription: PropTypes.func.isRequired,
    onChangeName: PropTypes.func.isRequired
};

export default AddEditDefectForm;
