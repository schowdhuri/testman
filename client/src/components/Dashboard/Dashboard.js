import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
    Panel,
    ProgressBar,
    Well
} from "react-bootstrap";
import Markdown from "react-markdown";

import dateFormat from "common/utils/dateFormat";
import fromNow from "common/utils/fromNow";

import "sass/components/Dashboard.scss";

class Dashboard extends React.Component {
    constructor() {
        super(...arguments);
    }
    componentDidMount() {
        this.props.onInit();
    }
    render() {
        const {
            recentComments,
            defects,
            execCycles
        } = this.props;

        return (<div className="dashboard">
            <div className="primary">
                <Panel className="assigned-defects">
                    <Panel.Heading>Assigned Defects</Panel.Heading>
                    <Panel.Body>
                        {defects.map(defect =>
                            <div key={`defect-${defect.id}`} className="defect">
                                 <Link
                                    className="defect-id text-danger"
                                    to={`/defects/edit/${defect.id}`}
                                >
                                    {`DF-${defect.id} `}
                                </Link>
                                <span className="name">{defect.name}</span>
                                <span className="raised-date" title="Created at">
                                    <i className="glyphicon glyphicon-time" />
                                    {" "}
                                    {dateFormat(defect.created)}
                                </span>
                                <span className="raised-by" title="Created by">
                                    <i className="glyphicon glyphicon-user" />
                                    {" "}
                                    {defect.user || "< Unknown >"}
                                </span>
                            </div>)}
                    </Panel.Body>
                </Panel>
            </div>
            <div className="secondary">
                <Panel className="exec-cycles">
                    <Panel.Heading>In Progress</Panel.Heading>
                    <Panel.Body>
                        {execCycles.map(execCycle => {
                            const total = execCycle.failed +
                                execCycle.passed +
                                execCycle.pending;
                            const percPass = Math.ceil(100*execCycle.passed / total);
                            const percFail = Math.ceil(100*execCycle.failed / total);
                            return (<div className="exec-cycle" key={`execCycle-${execCycle.id}`}>
                                <Link className="name text-info" to={`/execution/${execCycle.id}`}>{execCycle.name}</Link>
                                <ProgressBar>
                                    <ProgressBar bsStyle="success" now={percPass} key={1} />
                                    <ProgressBar bsStyle="danger" now={percFail} key={2} />
                                </ProgressBar>
                            </div>);
                        })}
                    </Panel.Body>
                </Panel>
                <Panel className="recent-comments">
                    <Panel.Heading>Activity</Panel.Heading>
                    <Panel.Body>
                        {recentComments.map(comment =>
                            <Well key={`comment-${comment.id}`}>
                                <div className="markdown-static">
                                    <Markdown source={comment.name} />
                                </div>
                                <span className="commenter">
                                    {comment.user ? comment.user.name : "Unknown"}
                                </span>
                                <span className="text">{" commented on "}</span>
                                <span className="entity">
                                    {comment.entity=="testCase"
                                        ? <Link to={`/design/testplan/${comment.testPlanId}/testcase/edit/${comment.entityId}`}>
                                            {`TC-${comment.entityId} `}
                                        </Link>
                                        : <Link to={`/defects/edit/${comment.entityId}`}>
                                            {`DF-${comment.entityId} `}
                                        </Link>}
                                </span>
                                <span className="comment-time" title={comment.created}>
                                    <i className="glyphicon glyphicon-time" />
                                    {fromNow(comment.created)}
                                </span>
                            </Well>)}
                    </Panel.Body>
                </Panel>
            </div>
        </div>);
    }
}
Dashboard.propTypes = {
    recentComments: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    })),
    defects: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    })),
    execCycles: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    })),
    isLoading: PropTypes.bool.isRequired
};

export default Dashboard;
