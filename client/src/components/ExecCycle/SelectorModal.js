import React from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";

import TestCaseSelector from "./SelectorContainer";

class SelectorModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItems: []
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }
    componentDidMount() {
        this.setState({
            selectedItems: this.props.selectedItems
        });
    }
    handleClose() {
        this.props.onClose(this.state.selectedItems);
    }
    handleSave() {
        this.props.onSave(this.props.selectedItems);
    }
    render() {
        const { show } = this.props;
        return (<Modal show={show} className="test-case-selector-modal">
            <Modal.Header>
                <Modal.Title>Import Test Cases</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TestCaseSelector />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.handleClose}>Cancel</Button>
                <Button bsStyle="success" onClick={this.handleSave}>Import</Button>
            </Modal.Footer>
        </Modal>);
    }
}

export default SelectorModal;
