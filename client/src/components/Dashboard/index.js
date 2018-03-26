import { connect } from "react-redux";

import * as actions from "actions/Dashboard";

import Dashboard from "./Dashboard";

import {
    getComments,
    getDefects,
    getExecCycles
} from "selectors/Dashboard";
import { isLoading } from "selectors/Shared";

const mapStateToProps = state => ({
    isLoading: isLoading(state),
    recentComments: getComments(state),
    defects: getDefects(state),
    execCycles: getExecCycles(state)
});

const mapDispatchToProps = dispatch => ({
    onInit() {
        dispatch(actions.reqSummary())
    }
});

const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default DashboardContainer;
