import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
    Button,
    OverlayTrigger,
    Tooltip
} from "react-bootstrap";

const addTooltip = <Tooltip id="add-tooltip">Add Defect</Tooltip>;
const deleteTooltip = <Tooltip id="delete-tooltip">Delete</Tooltip>;

class DefectToolbar extends React.Component {
    render() {
        const { allowDelete, onDelete } = this.props;
        return (<div className="toolbar">
            <OverlayTrigger placement="bottom" overlay={addTooltip}>
                <Link to={`/defects/add`} className="btn btn-link">
                    <i className="glyphicon glyphicon-plus text-info" />
                </Link>
            </OverlayTrigger>
            {allowDelete
                ? <OverlayTrigger placement="bottom" overlay={deleteTooltip}>
                    <Button bsStyle="link" onClick={onDelete}>
                        <i className="glyphicon glyphicon-trash text-danger" />
                    </Button>
                </OverlayTrigger>
                : null}
            <h3 className="header-gradient-1">Defects</h3>
        </div>);
    }
}
DefectToolbar.propTypes = {

};

export default DefectToolbar;
