import React from "react";
import PropTypes from "prop-types";
import Alert from "react-s-alert";
import {
    Button,
    ControlLabel,
    FormControl,
    FormGroup,
    Modal,
    Radio
} from "react-bootstrap";

import CLONE_TYPES from "common/constants/ExecCycleCloneTypes";

class CloneExecCycle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cloneType: CLONE_TYPES[0].id
        };
        this.handleChangeCloneType = this.handleChangeCloneType.bind(this);
        this.handleClone = this.handleClone.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleChangeCloneType(cloneType) {
        this.setState({ cloneType: cloneType.id });
    }
    handleClone() {
        this.props.onClone(
            this.props.execCycle.id,
            this.state.cloneType
        );
    }
    handleClose() {
        this.props.onClose();
    }
    render() {
        const { cloneType } = this.state;
        return (<Modal show={this.props.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Clone Execution Cycle</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormGroup>
                    {CLONE_TYPES.map(ct =>
                        <Radio
                            key={`clone-type-${ct.id}`}
                            checked={cloneType==ct.id}
                            name="items"
                            onChange={() => this.handleChangeCloneType(ct)}
                        >{ct.name}</Radio>)}
                </FormGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.handleClose}>Cancel</Button>
                <Button bsStyle="success" onClick={this.handleClone}>Clone</Button>
            </Modal.Footer>
        </Modal>);
    }
}
CloneExecCycle.propTypes = {
    show: PropTypes.bool.isRequired,
    execCycle: PropTypes.shape({
        id: PropTypes.number
    }),
    onClone: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};

export default CloneExecCycle;
