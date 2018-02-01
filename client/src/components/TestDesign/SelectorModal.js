import React from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";

import Selector from "./SelectorContainer";

const SelectorModal = props =>
    (<Modal show={props.show} className="test-case-selector-modal">
        <Modal.Header>
            <Modal.Title>Import Test Cases</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <TestCaseSelector />
        </Modal.Body>
        <Modal.Footer>
            <Button>Close</Button>
            <Button bsStyle="primary">Save</Button>
        </Modal.Footer>
    </Modal>);

export default SelectorModal;
