import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import EditTestPlan from "./AddEditTestPlan";
import TestPlansToolbar from "./TestPlansToolbar";

import "./TestPlans.scss";

class TestPlans extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editDialog: false
        };
        this.handleSave = this.handleSave.bind(this);
        this.hideEditDialog = this.hideEditDialog.bind(this);
        this.showEditDialog = this.showEditDialog.bind(this);
    }
    componentDidMount() {
        if(!this.props.testPlanId && this.props.selected && this.props.selected.id) {
            this.props.onSelect(this.props.selected.id, true);
        } else {
            this.props.reqTestPlans();
        }
    }
    componentWillReceiveProps(nextProps) {
        const redirect = Boolean(!this.props.testPlanId &&
            nextProps.selected &&
            nextProps.selected.id);

        const newId = nextProps.testPlanId ||
            nextProps.selected && nextProps.selected.id;

        if(newId)
            this.props.onSelect(newId, redirect);
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
        const { testPlans } = this.props;
        const { editDialog, testPlan } = this.state;
        return (<div className="test-plans">
            <TestPlansToolbar onSave={this.props.onSave} />
            <ul>
                {testPlans.map(tp => (<li
                    className={`${tp.selected ? "bg-success selected" : ""}`}
                    key={tp.id}
                >
                    <Link to={`/design/testplan/${tp.id}`}>
                        {tp.name}
                        <button
                            className="btn btn-link btn-edit"
                            onClick={() => this.showEditDialog(tp)}
                        >
                            <i className="glyphicon glyphicon-pencil text-info" />
                        </button>
                    </Link>
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
    selected: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    }),
    testPlanId: PropTypes.number,
    testPlans: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }))
};

export default TestPlans;
