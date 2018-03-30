import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";


const ActionBar = props => {
    const { onCancel, onSave } = props;
    return (<div className="custom-actionbar modal-footer">
        <Button onClick={onCancel}>Cancel</Button>
        <Button bsStyle="success" onClick={onSave}>Save</Button>
    </div>);
};
ActionBar.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
};

export default ActionBar;
