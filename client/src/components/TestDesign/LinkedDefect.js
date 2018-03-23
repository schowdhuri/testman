import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";


const LinkedDefect = props => {
    const {
        allowDelete=false,
        defect,
        onDelete
    } = props;

    const {
        id,
        name
    } = defect;

    const handleDelete = () => typeof(onDelete)=="function"
        ? onDelete(defect)
        : {};

    return (<tr className="linked-defect">
        <td className="defect-id">
            <Link
                to={`/defects/edit/${id}`}
                target="_blank"
                className="text-danger"
            >
                DF-{id}
                {" "}
                <i className="glyphicon glyphicon-share text-danger" />
            </Link>
        </td>
        <td className="defect-name">{name}</td>
        {allowDelete
            ? <td className="del-defect">
                <Button bsStyle="link" className="btn-delete-defect" onClick={handleDelete}>
                    <i className="glyphicon glyphicon-trash text-danger" />
                </Button>
            </td>
            : null}
    </tr>);
};
LinkedDefect.propTypes = {
    allowDelete: PropTypes.bool,
    defect: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }),
    onDelete: PropTypes.func.isRequired
};

export default LinkedDefect;
