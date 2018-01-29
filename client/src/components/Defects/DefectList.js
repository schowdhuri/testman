import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
    Table
} from "react-bootstrap";

import Toolbar from "./Toolbar";

class DefectList extends React.Component {
    componentDidMount() {
        this.props.fetchDefects();
    }
    render() {
        const { defects } = this.props;
        return (<div className="defects-list">
            <Toolbar />
            <Table striped condensed hover className="data-grid ">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Test Cases</th>
                        <th>Comments</th>
                    </tr>
                </thead>
                <tbody>
                    {defects.map(d => (<tr key={`d-${d.id}`}>
                        <td>{d.id}</td>
                        <td>
                            <Link to={`/defects/edit/${d.id}`}>{d.name}</Link>
                        </td>
                        <td>{d.status}</td>
                        <td>{d.testCases ? d.testCases.length : 0}</td>
                        <td>{d.comments ? d.comments.length : 0}</td>
                    </tr>))}
                </tbody>
            </Table>
        </div>);
    }
}

export default DefectList;
