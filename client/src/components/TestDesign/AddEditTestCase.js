import React from "react";
import PropTypes from "prop-types";

import {
    Button,
    ButtonToolbar,
    ControlLabel,
    FormControl,
    FormGroup
} from "react-bootstrap";

class AddEditTestCase extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeDescr = this.handleChangeDescr.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }
    componentDidMount() {
        if(this.props.testID) {
            this.props.onInit(this.props.testID);
        }
    }
    handleChangeDescr(ev) {
        this.props.onChangeDescription(ev.target.value);
    }
    handleChangeName(ev) {
        this.props.onChangeName(ev.target.value);
    }
    handleSave() {
        this.props.onSave(this.props.testPlanID, this.props.testCase);
    }
    render() {
        const { mode, testID, testCase, onCancel } = this.props;

        return (<div className="add-edit-tc">
            <div className="container">
                <div className="card">
                    <FormGroup controlId="name">
                        <ControlLabel>Name</ControlLabel>
                        <FormControl
                            value={testCase.name}
                            onChange={this.handleChangeName}
                            type="text" />
                    </FormGroup>
                    <FormGroup controlId="description">
                        <ControlLabel>Description</ControlLabel>
                        <FormControl
                            value={testCase.description.value}
                            onChange={this.handleChangeDescr}
                            componentClass="textarea" />
                    </FormGroup>
                    <ButtonToolbar>
                        <Button bsStyle="success" onClick={this.handleSave}>Save</Button>
                        <Button onClick={onCancel}>Cancel</Button>
                    </ButtonToolbar>
                </div>
            </div>
        </div>);
    }
}
AddEditTestCase.propTypes = {
    mode: PropTypes.string,
    testID: PropTypes.number
};

export default AddEditTestCase;
