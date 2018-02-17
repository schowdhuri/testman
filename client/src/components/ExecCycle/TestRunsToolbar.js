import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

class TestRunToolbar extends React.Component {
    render() {
        const { allowDelete, execCycle, onAdd, onDelete } = this.props;
        return (<div className="toolbar">
            {execCycle
                ? <Button bsStyle="link" onClick={onAdd}>
                    <i className="glyphicon glyphicon-plus" />
                </Button>
                : null}
            {execCycle && allowDelete
                ? <Button bsStyle="link" onClick={onDelete}>
                    <i className="glyphicon glyphicon-trash text-danger" />
                </Button>
                : null}
            <h3 className="header-gradient-1">
                Tests
                {execCycle ? " - " + execCycle.name : ""}
            </h3>
        </div>);
    }
}
TestRunToolbar.propTypes = {
    execCycle: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    })
};

export default TestRunToolbar;
