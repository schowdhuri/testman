import React from "react";
import PropTypes from "prop-types";

import EditTestPlan from "./AddEditTestPlan";
import TestPlansToolbar from "./TestPlansToolbar";

import "sass/components/TestPlans.scss";

class TestPlans extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editDialog: false
        };
        this.handleSave = this.handleSave.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.hideEditDialog = this.hideEditDialog.bind(this);
        this.showEditDialog = this.showEditDialog.bind(this);
    }
    componentDidMount() {
        this.props.reqTestPlans();
    }
    handleSave(data) {
        this.props.onSave(data);
        this.hideEditDialog();
    }
    handleSelect(testPlan) {
        this.props.onSelect(testPlan);
    }
    hideEditDialog() {
        this.setState({ editDialog: false, testPlan: {} });
    }
    showEditDialog(testPlan) {
        this.setState({
            testPlan,
            editDialog: true
        });
    }
    render() {
        const { testPlans } = this.props;
        const { editDialog, testPlan } = this.state;
        return (<div className="test-plans">
            <TestPlansToolbar onSave={this.props.onSave} />
            <ul>
                {testPlans.map(tp => (<li
                    className={`${tp.selected ? "bg-success selected" : ""}`}
                    key={tp.id}
                    onClick={() => this.handleSelect(tp)}
                >
                    <span>{tp.name}</span>
                    <button className="btn btn-link btn-edit" onClick={() => this.showEditDialog(tp)}>
                        <i className="glyphicon glyphicon-pencil" />
                    </button>
                </li>))}
            </ul>
            <EditTestPlan
                show={editDialog}
                testPlan={testPlan}
                onClose={this.hideEditDialog}
                onSave={this.handleSave} />
        </div>);
    }
}
TestPlans.propTypes = {
    reqTestPlans: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    testPlans: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }))
};

export default TestPlans;
