import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const LinkedDefect = props => {
    const { defect } = props;

    const {
        id,
        name
    } = defect;

    return (<tr className="linked-defect">
        <td className="defect-id">
            <Link
                to={`/defects/edit/${id}`}
                target="_blank"
                className="text-danger"
            >
                DF-{id}
                {" "}
                <i className="glyphicon glyphicon-share-alt text-danger" />
            </Link>
        </td>
        <td className="defect-name">{name}</td>
    </tr>);
};
LinkedDefect.propTypes = {

};

export default LinkedDefect;
