import React from "react";
import PropTypes from "prop-types";

import {
    Button,
    ButtonToolbar,
    ControlLabel,
    FormControl,
    FormGroup,
    Modal
} from "react-bootstrap";

class AddEditTestPlan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.show && !this.props.show) {
            this.setState({
                id: nextProps.testPlan && nextProps.testPlan.id,
                name: nextProps.testPlan && nextProps.testPlan.name || ""
            });
        }
    }
    handleChangeName(ev) {
        this.setState({
            name: ev.target.value
        });
    }
    handleClose() {
        this.props.onClose();
    }
    handleSave() {
        this.props.onSave({
            id: this.state.id,
            name: this.state.name
        });
    }
    render() {
        const { name } = this.state;

        return (<Modal show={this.props.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Test Plan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormGroup controlId="name">
                    <ControlLabel>Name</ControlLabel>
                    <FormControl
                        value={name}
                        onChange={this.handleChangeName}
                        type="text" />
                </FormGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.handleClose}>Cancel</Button>
                <Button bsStyle="success" onClick={this.handleSave}>Save</Button>
            </Modal.Footer>
        </Modal>);
    }
}
AddEditTestPlan.propTypes = {
    
};

export default AddEditTestPlan;
