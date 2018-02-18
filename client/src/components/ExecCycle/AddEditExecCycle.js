import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import {
    Button,
    ButtonToolbar,
    Col,
    ControlLabel,
    DropdownButton,
    FormControl,
    FormGroup,
    MenuItem,
    Modal,
    Row
} from "react-bootstrap";

const execCycleStatus = ["New", "In Progress", "Completed"];

class AddEditExecCycle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            startDate: "",
            endDate: "",
            status: "New"
        };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.show && !this.props.show) {
            this.setState({
                id: nextProps.execCycle && nextProps.execCycle.id,
                name: nextProps.execCycle && nextProps.execCycle.name || "",
                startDate: nextProps.execCycle && nextProps.execCycle.startDate,
                endDate: nextProps.execCycle && nextProps.execCycle.endDate,
                status: nextProps.execCycle && nextProps.execCycle.status
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
        const { name, startDate, endDate, status } = this.state;

        return (<Modal show={this.props.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>New Execution Cycle</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={6}>
                        <FormGroup controlId="name">
                            <ControlLabel>Name</ControlLabel>
                            <FormControl
                                value={name}
                                onChange={this.handleChangeName}
                                type="text" />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup controlId="status">
                            <ControlLabel>Status</ControlLabel>
                            <br/>
                            <DropdownButton title={status} id="status-dropdown">
                                {execCycleStatus.map(s =>
                                    <MenuItem key={s} active={status==s}>{s}</MenuItem>)}
                            </DropdownButton>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup controlId="startDate">
                            <ControlLabel>Start Date</ControlLabel>
                            <FormControl
                                value={startDate}
                                onChange={this.handleChangeName}
                                type="text" />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup controlId="endDate">
                            <ControlLabel>End Date</ControlLabel>
                            <FormControl
                                value={endDate}
                                onChange={this.handleChangeName}
                                type="text" />
                        </FormGroup>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.handleClose}>Cancel</Button>
                <Button bsStyle="success" onClick={this.handleSave}>Save</Button>
            </Modal.Footer>
        </Modal>);
    }
}
AddEditExecCycle.propTypes = {

};

export default AddEditExecCycle;
