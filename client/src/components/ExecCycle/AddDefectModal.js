import React from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";

import AddEditDefect from "components/Defects/AddEditDefectContainer";


const ActionBar = props => {
    const { onSave, onCancel } = props;
    return (<div className="custom-actionbar modal-footer">
        <Button onClick={onCancel}>Cancel</Button>
        <Button bsStyle="success" onClick={onSave}>Save</Button>
    </div>);
};

class AddDefectModal extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }
    handleClose() {
        this.props.onClose();
    }
    handleSave(defect, files) {
        console.log(defect, files)
        const { testCase } = this.props;
        this.props.onSave(
            {
                ...defect,
                testCases: [{
                    id: testCase.id,
                    name: testCase.name,
                    testPlan: testCase.testPlan.id
                }]
            },
            files
        );
    }
    render() {
        const { show, testCase } = this.props;
        const linkedTestCases = [{
            id: testCase.id,
            name: testCase.name,
            testPlan: testCase.testPlan && testCase.testPlan.id
        }];
        return (<Modal show={show} className="add-defect-modal">
            <Modal.Header>
                <Modal.Title>Add Defect</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddEditDefect
                    allowAddTestCase={false}
                    allowDeleteTestCase={false}
                    ActionBar={ActionBar}
                    testCases={linkedTestCases}
                    onCancel={this.handleClose}
                    onSave={this.handleSave} />
            </Modal.Body>
        </Modal>);
    }
}
AddDefectModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
};

export default AddDefectModal;
