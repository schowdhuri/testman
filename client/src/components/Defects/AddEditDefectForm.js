import React from "react";
import PropTypes from "prop-types";
import {
    ControlLabel,
    FormControl,
    FormGroup
} from "react-bootstrap";

const AddEditDefectForm = props => {
    const {
        description,
        name,
        onChangeName,
        onChangeDescription
    } = props;

    const handleChangeName = ev => onChangeName(ev.target.value);
    const handleChangeDescription = ev => onChangeDescription(ev.target.value);

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
    </React.Fragment>);
};
AddEditDefectForm.propTypes = {
    description: PropTypes.string,
    name: PropTypes.string,
    onChangeDescription: PropTypes.func.isRequired,
    onChangeName: PropTypes.func.isRequired
};

export default AddEditDefectForm;
