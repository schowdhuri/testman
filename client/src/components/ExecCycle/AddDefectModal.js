import React from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";

import AddEditDefect from "components/Defects/AddEditDefectContainer";

import ActionBar from "./AddDefectModalActionBar";


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
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    testCase: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        testPlan: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string
        })
    }),
};

export default AddDefectModal;
