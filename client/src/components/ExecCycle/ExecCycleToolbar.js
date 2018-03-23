import React from "react";
import PropTypes from "prop-types";

import AddEditExecCycle from "./AddEditExecCycle";


class ExecCycleToolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { show: false };
        this.handleSave = this.handleSave.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.showDialog = this.showDialog.bind(this);
    }
    handleSave(data) {
        this.props.onSave(data);
        this.hideDialog();
    }
    hideDialog() {
        this.setState({ show: false });
    }
    showDialog() {
        this.setState({ show: true });
    }
    render() {
        const { show } = this.state;
        return (<div className="toolbar">
            <button className="btn btn-link" onClick={this.showDialog}>
                <i className="glyphicon glyphicon-plus text-info" />
                {" "}
                <span className="text-info">New</span>
            </button>
            <h3 className="header-gradient-1">Execution Cycles</h3>
            <AddEditExecCycle
                show={show}
                onClose={this.hideDialog}
                onSave={this.handleSave} />
        </div>);
    }
}
ExecCycleToolbar.propTypes = {
    onSave: PropTypes.func.isRequired
};

export default ExecCycleToolbar;
