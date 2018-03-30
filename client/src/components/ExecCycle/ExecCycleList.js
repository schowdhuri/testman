import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import CloneExecCycle from "./CloneExecCycle";
import EditExecCycle from "./AddEditExecCycle";
import ExecCycleToolbar from "./ExecCycleToolbar";

class ExecCycleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cloneDialog: false,
            editDialog: false
        };
        this.handleClone = this.handleClone.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.hideCloneDialog = this.hideCloneDialog.bind(this);
        this.hideEditDialog = this.hideEditDialog.bind(this);
        this.showCloneDialog = this.showCloneDialog.bind(this);
        this.showEditDialog = this.showEditDialog.bind(this);
    }
    componentDidMount() {
        if(!this.props.execCycleId && this.props.selected && this.props.selected.id) {
            this.handleSelect(this.props.selected.id, true);
        } else {
            this.props.reqExecCycles();
        }
    }
    componentWillReceiveProps(nextProps) {
        const redirect = Boolean(!this.props.execCycleId &&
            nextProps.selected &&
            nextProps.selected.id);

        const newId = nextProps.execCycleId ||
            nextProps.selected && nextProps.selected.id;

        if(newId)
            this.handleSelect(newId, redirect);
    }
    handleClone(id, cloneType) {
        this.hideCloneDialog();
        this.props.onClone(id, cloneType);
    }
    handleDelete(execCycle) {
        this.props.onDeleteExecCycle(execCycle);
        this.hideEditDialog();
    }
    handleSave(data) {
        this.props.onSave(data);
        this.hideEditDialog();
    }
    handleSelect(execCycleId, redirect) {
        this.props.onSelect({
            id: execCycleId
        }, redirect);
    }
    hideCloneDialog() {
        this.setState({ cloneDialog: false, execCycle: {} });
    }
    hideEditDialog() {
        this.setState({ editDialog: false, execCycle: {} });
    }
    showCloneDialog(execCycle, ev) {
        ev.preventDefault();
        this.setState({
            execCycle,
            cloneDialog: true
        });
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
        const { cloneDialog, editDialog, execCycle } = this.state;
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
                            <i className="glyphicon glyphicon-pencil text-info" />
                        </button>
                        <button className="btn btn-link btn-clone" onClick={ev => this.showCloneDialog(ec, ev)}>
                            <i className="glyphicon glyphicon-duplicate text-info" />
                        </button>
                    </Link>
                </li>))}
            </ul>
            <CloneExecCycle
                show={cloneDialog}
                execCycle={execCycle}
                onClose={this.hideCloneDialog}
                onClone={this.handleClone} />
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
    onClone: PropTypes.func.isRequired,
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
