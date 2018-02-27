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
        defectId,
        description,
        name,
        status,
        onChangeName,
        onChangeDescription,
        onChangeStatus
    } = props;

    const handleChangeDescription = ev => onChangeDescription(ev.target.value);
    const handleChangeStatus = val => onChangeStatus
        ? onChangeStatus(val)
        : {};

    return (<React.Fragment>
        <Row>
            <Col md={11}>
                <Title placeholder="Name" onUpdate={onChangeName} value={name} />
            </Col>
            <Col md={1}>
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
        <Description placeholder="Description" onUpdate={onChangeDescription} value={description} />
    </React.Fragment>);
};
AddEditDefectForm.propTypes = {
    description: PropTypes.string,
    name: PropTypes.string,
    onChangeDescription: PropTypes.func.isRequired,
    onChangeName: PropTypes.func.isRequired
};

export default AddEditDefectForm;
