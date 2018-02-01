import React from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";

import TestCaseSelector from "components/TestDesign/SelectorContainer";

class ExecCycle extends React.Component {
    render() {
        return (<div>
            <Modal show={true} className="test-case-selector-modal">
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
            </Modal>
        </div>);
    }
}

export default ExecCycle;
