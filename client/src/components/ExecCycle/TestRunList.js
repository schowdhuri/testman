import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
    Table
} from "react-bootstrap";

import SelectorModal from "./SelectorModal";
import TestRunsToolbar from "./TestRunsToolbar";

class TestRunList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectorModal: false
        };
        this.hideSelector = this.hideSelector.bind(this);
        this.importTests = this.importTests.bind(this);
        this.showSelector = this.showSelector.bind(this);
        this.toggleSelector = this.toggleSelector.bind(this);
    }
    componentDidMount() {
        if(this.props.execCycle && this.props.eecCycleID == this.props.execCycle.id)
            this.props.fetchTestRuns(this.props.execCycle);
    }
    componentWillReceiveProps(nextProps) {
        if((nextProps.execCycle != this.props.execCycle ||
            (nextProps.execCycle && this.props.execCycle && nextProps.execCycle.id != this.props.execCycle.id))
        ) {
            this.props.fetchTestRuns(nextProps.execCycle);
        }
    }
    hideSelector() {
        this.toggleSelector(false);
    }
    importTests(data) {
        console.log("import: ", data);
    }
    showSelector() {
        this.toggleSelector(true);
    }
    toggleSelector(show=false) {
        this.setState({ selectorModal: show });
    }
    render() {
        const {
            testRuns,
            execCycle
        } = this.props;
        const { selectorModal } = this.state;

        return (<div className="test-runs-list">
            <TestRunsToolbar execCycle={execCycle} onAdd={this.showSelector} />
            <Table striped condensed hover className="data-grid ">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Defects</th>
                        <th>Comments</th>
                    </tr>
                </thead>
                <tbody>
                    {testRuns.map(tr => (<tr key={`tr-${tr.id}`}>
                        <td>{`TC-${tr.testCase}`}</td>
                        <td>
                            <Link to={`/exec/${execCycle.id}/test/edit/${tr.id}`}>{tr.name}</Link>
                        </td>
                        <td>{tr.status}</td>
                        <td>{tr.defects ? tr.defects.length : 0}</td>
                        <td>{tr.comments ? tr.comments.length : 0}</td>
                    </tr>))}
                </tbody>
            </Table>
            <SelectorModal show={selectorModal} onClose={this.hideSelector} onSave={this.importTests} />
        </div>);
    }
}

export default TestRunList;