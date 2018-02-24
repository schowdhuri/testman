import React from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";

import DefectForm from "components/Defects/AddEditDefectForm";

class AddDefectModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: ""
        };
        this.handleChangeDescr = this.handleChangeDescr.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }
    componentDidMount() {
        // this.setState({
        //     preSelectedItems: this.props.selectedItems
        // });
    }
    handleChangeDescr(description) {
        this.setState({ description });
    }
    handleChangeName(name) {
        this.setState({ name });
    }
    handleClose() {
        this.props.onClose();
    }
    handleSave() {
        this.props.onSave({
            name: this.state.name,
            description: this.state.description
        });
    }
    render() {
        const { show } = this.props;
        const { name, description } = this.state;
        return (<Modal show={show} className="add-defect-modal">
            <Modal.Header>
                <Modal.Title>Add Defect</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <DefectForm
                    onChangeName={this.handleChangeName}
                    onChangeDescription={this.handleChangeDescr} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.handleClose}>Cancel</Button>
                <Button bsStyle="success" onClick={this.handleSave} disabled={!name.length}>Save</Button>
            </Modal.Footer>
        </Modal>);
    }
}

export default AddDefectModal;
