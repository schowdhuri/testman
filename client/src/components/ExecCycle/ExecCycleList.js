import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import EditExecCycle from "./AddEditExecCycle";
import ExecCycleToolbar from "./ExecCycleToolbar";

class ExecCycleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editDialog: false
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.hideEditDialog = this.hideEditDialog.bind(this);
        this.showEditDialog = this.showEditDialog.bind(this);
    }
    componentDidMount() {
        if(this.props.execCycleId &&
            (!this.props.selected || this.props.selected.id != this.props.execCycleId)
        ) {
            this.handleSelect(this.props.execCycleId);
        }
        this.props.reqExecCycles();
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.execCycleId &&
            (!this.props.selected || this.props.selected.id != nextProps.execCycleId)
        ) {
            this.handleSelect(nextProps.execCycleId);
        }
    }
    handleDelete(execCycle) {
        this.props.onDeleteExecCycle(execCycle);
        this.hideEditDialog();
    }
    handleSave(data) {
        this.props.onSave(data);
        this.hideEditDialog();
    }
    handleSelect(execCycleId) {
        this.props.onSelect({
            id: execCycleId
        });
    }
    hideEditDialog() {
        this.setState({ editDialog: false, execCycle: {} });
    }
    showEditDialog(execCycle, ev) {
        ev.preventDefault();
        this.setState({
            execCycle,
            editDialog: true
        });
    }
    render() {
        const { execCycles } = this.props;
        const { editDialog, execCycle } = this.state;
        return (<div className="cycles">
            <ExecCycleToolbar onSave={this.props.onSave} />
            <ul>
                {execCycles.map(ec => (<li
                    className={`${ec.selected ? "bg-success selected" : ""}`}
                    key={ec.id}
                >
                    <Link to={`/execution/${ec.id}`}>
                        {ec.name}
                        <button className="btn btn-link btn-edit" onClick={ev => this.showEditDialog(ec, ev)}>
                            <i className="glyphicon glyphicon-pencil" />
                        </button>
                    </Link>
                </li>))}
            </ul>
            <EditExecCycle
                show={editDialog}
                execCycle={execCycle}
                onClose={this.hideEditDialog}
                onDelete={this.handleDelete}
                onSave={this.handleSave} />
        </div>);
    }
}
ExecCycleList.propTypes = {
    execCycleId: PropTypes.number,
    execCycles: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    })),
    onDeleteExecCycle: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    reqExecCycles: PropTypes.func.isRequired,
    selected: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    })
};

export default ExecCycleList;
