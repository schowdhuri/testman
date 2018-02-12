import React from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";

import TestCaseSelector from "./SelectorContainer";

class SelectorModal extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { selected, show, onClose } = this.props;
        return (<Modal show={show} className="test-case-selector-modal">
            <Modal.Header>
                <Modal.Title>Import Test Cases</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TestCaseSelector selected={selected} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose}>Close</Button>
                <Button bsStyle="primary">Save</Button>
            </Modal.Footer>
        </Modal>);
    }
}

export default SelectorModal;
