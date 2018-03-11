import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const DefectListItem = props => {
    const {
        defect,
        onToggle
    } = props;

    const {
        assignee,
        id,
        name,
        status,
        selected,
        testCases,
        comments,
    } = defect;

    const handleToggle = ev => {
        onToggle(defect, ev.target.checked);
    };

    return (<tr>
        <td>
            <input
                type="checkbox"
                checked={selected}
                onChange={handleToggle} />
        </td>
        <td>DF-{id}</td>
        <td>
            <Link to={`/defects/edit/${id}`}>{name}</Link>
        </td>
        <td>{assignee && assignee.name || "< Unassigned >"}</td>
        <td>{status}</td>
        <td>{testCases ? testCases.length : 0}</td>
        <td>{comments ? comments.length : 0}</td>
    </tr>);
};
DefectListItem.propTypes = {

};

export default DefectListItem;
