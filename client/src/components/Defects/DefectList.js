import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
    Table
} from "react-bootstrap";

import ListItem from "./DefectListItem";
import Toolbar from "./Toolbar";

class DefectList extends React.Component {
    constructor(props) {
        super(props);
        this.bulkDelete = this.bulkDelete.bind(this);
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
    toggleSelect(defect, status) {
        this.props.onToggleSelect(defect, status);
    }
    toggleSelectAll(ev) {
        this.props.onToggleSelectAll(ev.target.checked);
    }
    render() {
        const {
            allowDelete,
            allSelected,
            defects,
            selected
        } = this.props;
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
                        <th>Assigned To</th>
                        <th>Status</th>
                        <th>Test Cases</th>
                        <th>Comments</th>
                    </tr>
                </thead>
                <tbody>
                    {defects.map(d => (<ListItem
                        key={`defect-${d.id}`}
                        defect={d}
                        onToggle={this.toggleSelect} />))}
                </tbody>
            </Table>
        </div>);
    }
}

export default DefectList;
