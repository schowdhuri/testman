import React from "react";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";

import STATES from "common/constants/DefectStates";

import ColumnFilter from "components/Shared/ColumnFilter/index";

import ListItem from "./DefectListItem";
import Toolbar from "./Toolbar";

const defectStateFilterItems = STATES.map(s => ({ id: s, name: s }));
const UNASSIGNED = "<Unassigned>";

class DefectList extends React.Component {
    constructor(props) {
        super(props);
        this.applyFilters = this.applyFilters.bind(this);
        this.bulkDelete = this.bulkDelete.bind(this);
        this.handleAssigneeFilter = this.handleAssigneeFilter.bind(this);
        this.handleStatusFilter = this.handleStatusFilter.bind(this);
        this.toggleSelect = this.toggleSelect.bind(this);
        this.toggleSelectAll = this.toggleSelectAll.bind(this);
    }
    componentDidMount() {
        this.props.fetchDefects();
    }
    bulkDelete() {
        if(confirm(`Delete ${this.props.selected.length} defects?`))
            this.props.onDelete(this.props.selected.map(d => d.id));
    }
    handleAssigneeFilter(value) {
        this.props.onChangeAssigneeFilter(value);
    }
    handleStatusFilter(value) {
        this.props.onChangeStatusFilter(value);
    }
    toggleSelect(defect, status) {
        this.props.onToggleSelect(defect, status);
    }
    toggleSelectAll(ev) {
        this.props.onToggleSelectAll(ev.target.checked);
    }
    applyFilters(defects) {
        const { assigneeFilter, statusFilter } = this.props;
        if(assigneeFilter) {
            if(assigneeFilter.id==UNASSIGNED)
                defects = defects.filter(d => !d.assignee);
            else
                defects = defects.filter(d => d.assignee && d.assignee.id==assigneeFilter.id);
        }
        if(statusFilter)
            defects = defects.filter(d => d.status==statusFilter.id);
        return defects;
    }
    render() {
        const {
            allowDelete,
            allSelected,
            assigneeFilter,
            defects,
            statusFilter
        } = this.props;

        const assigneeList = defects
            .map(d => d.assignee)
            .filter(a => a);
        assigneeList.push({ id: UNASSIGNED, name: UNASSIGNED });

        return (<div className="defects-list">
            <Toolbar allowDelete={allowDelete} onDelete={this.bulkDelete} />
            <Table striped condensed hover className="data-grid ">
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                checked={allSelected}
                                onChange={(ev) => this.toggleSelectAll(ev)} />
                        </th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>
                            Assigned To
                            <ColumnFilter
                                items={assigneeList}
                                selected={assigneeFilter}
                                onChange={this.handleAssigneeFilter} />
                        </th>
                        <th>
                            Status
                            <ColumnFilter
                                items={defectStateFilterItems}
                                selected={statusFilter}
                                onChange={this.handleStatusFilter} />
                        </th>
                        <th>Test Cases</th>
                        <th>Comments</th>
                    </tr>
                </thead>
                <tbody>
                    {this.applyFilters(defects).map(d => (<ListItem
                        key={`defect-${d.id}`}
                        defect={d}
                        onToggle={this.toggleSelect} />))}
                </tbody>
            </Table>
        </div>);
    }
}
DefectList.propTypes = {
    allowDelete: PropTypes.bool,
    allSelected: PropTypes.bool,
    assigneeFilter: PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        name: PropTypes.string.isRequired
    }),
    defects: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    })),
    fetchDefects: PropTypes.func.isRequired,
    onChangeAssigneeFilter: PropTypes.func.isRequired,
    onChangeStatusFilter: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleSelect: PropTypes.func.isRequired,
    onToggleSelectAll: PropTypes.func.isRequired,
    selected: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    })),
    statusFilter: PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        name: PropTypes.string.isRequired
    })
};

export default DefectList;
