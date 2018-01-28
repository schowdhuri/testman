import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import EditTestPlan from "./AddEditTestPlan";
import TestPlansToolbar from "./TestPlansToolbar";

import "sass/components/TestPlans.scss";

class TestPlans extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editDialog: false
        };
        this.autoRedirect = this.autoRedirect.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.hideEditDialog = this.hideEditDialog.bind(this);
        this.showEditDialog = this.showEditDialog.bind(this);
    }
    componentDidMount() {
        this.props.onInit(); 
        this.autoRedirect(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.autoRedirect(nextProps);
    }
    autoRedirect(p) {
        const { selected, testPlanID, testPlans } = p;
        if(!testPlanID && selected)
            this.props.redirectTo(selected);
        else if(!testPlanID && testPlans.length)
            this.props.redirectTo(testPlans[0].id);
        else if(testPlanID && testPlanID != selected)
            this.props.onSelect(testPlanID);
    }
    handleSave(data) {
        this.props.onSave(data);
        this.hideEditDialog();
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
        const { testPlans, testPlanID } = this.props;
        const { editDialog, testPlan } = this.state;
        return (<div className="test-plans">
            <TestPlansToolbar onSave={this.props.onSave} />
            <ul>
                {testPlans.map(tp => (<li
                    className={`${tp.id==testPlanID ? "bg-success selected" : ""}`}
                    key={tp.id}
                >
                    <Link to={`/design/testPlan/${tp.id}`}>{tp.name}</Link>
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
    onInit: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
};

export default TestPlans;
