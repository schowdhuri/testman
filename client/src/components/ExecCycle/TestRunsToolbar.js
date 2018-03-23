import React from "react";
import PropTypes from "prop-types";
import {
    Button,
    OverlayTrigger,
    Tooltip
} from "react-bootstrap";

const addTooltip = <Tooltip id="add-tooltip">Add Tests</Tooltip>;
const deleteTooltip = <Tooltip id="delete-tooltip">Delete Tests</Tooltip>;
const startTooltip = <Tooltip id="start-tooltip">Start</Tooltip>;
const endTooltip = <Tooltip id="end-tooltip">End</Tooltip>;

class TestRunToolbar extends React.Component {
    constructor(props) {
        super(props);
        this.handleEnd = this.handleEnd.bind(this);
        this.handleStart = this.handleStart.bind(this);
    }
    handleEnd() {
        this.props.onEnd(this.props.execCycle);
    }
    handleStart() {
        this.props.onStart(this.props.execCycle);
    }
    render() {
        const {
            allowDelete,
            allowEnd,
            allowStart,
            execCycle,
            onAdd,
            onDelete
        } = this.props;
        return (<div className="toolbar">
            {execCycle
                ? <OverlayTrigger placement="bottom" overlay={addTooltip}>
                    <Button bsStyle="link" onClick={onAdd}>
                        <i className="glyphicon glyphicon-plus text-info" />
                    </Button>
                </OverlayTrigger>
                : null}
            {execCycle && allowStart
                ? <OverlayTrigger placement="bottom" overlay={startTooltip}>
                    <Button bsStyle="link" onClick={this.handleStart}>
                        <i className="glyphicon glyphicon-play" />
                    </Button>
                </OverlayTrigger>
                : null}
            {execCycle && allowEnd
                ? <OverlayTrigger placement="bottom" overlay={endTooltip}>
                    <Button bsStyle="link" onClick={this.handleEnd}>
                        <i className="glyphicon glyphicon-stop text-warning" />
                    </Button>
                </OverlayTrigger>
                : null}
            {execCycle && allowDelete
                ? <OverlayTrigger placement="bottom" overlay={deleteTooltip}>
                    <Button bsStyle="link" onClick={onDelete}>
                        <i className="glyphicon glyphicon-trash text-danger" />
                    </Button>
                </OverlayTrigger>
                : null}

            <h3 className="header-gradient-1">
                Tests
                {execCycle ? " - " + execCycle.name : ""}
            </h3>
        </div>);
    }
}
TestRunToolbar.propTypes = {
    allowDelete: PropTypes.bool,
    allowEnd: PropTypes.bool,
    allowStart: PropTypes.bool,
    execCycle: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }),
    onAdd: PropTypes.func.isRequired,
    onEnd: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onStart: PropTypes.func.isRequired
};

export default TestRunToolbar;
