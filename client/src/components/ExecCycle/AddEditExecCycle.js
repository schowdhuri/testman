import React from "react";
import PropTypes from "prop-types";
import Alert from "react-s-alert";
import {
    Button,
    ControlLabel,
    FormControl,
    FormGroup,
    Modal
} from "react-bootstrap";

class AddEditExecCycle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.show && !this.props.show) {
            this.setState({
                id: nextProps.execCycle && nextProps.execCycle.id,
                name: nextProps.execCycle && nextProps.execCycle.name || ""
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
    handleDelete() {
        if(this.props.execCycle.testRuns.length) {
            Alert.error("Can't delete a non-empty execution cycle");
            return;
        }
        if(confirm("Are you sure you want to delete this execution cycle?"))
            this.props.onDelete(this.props.execCycle);
    }
    handleSave() {
        this.props.onSave({
            ...this.props.execCycle,
            name: this.state.name
        });
    }
    render() {
        const { id, name } = this.state;

        return (<Modal show={this.props.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
                {id
                    ? <Modal.Title>Edit Execution Cycle</Modal.Title>
                    : <Modal.Title>New Execution Cycle</Modal.Title>}
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
AddEditExecCycle.propTypes = {
    show: PropTypes.bool.isRequired,
    execCycle: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        testRuns: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired
        }))
    }),
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
    onSave: PropTypes.func.isRequired
};

export default AddEditExecCycle;
