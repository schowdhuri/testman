import { connect } from "react-redux";
import ExecCycleList from "./ExecCycleList";

import * as actions from "actions/ExecCycle";
import { redirectToTestPlan } from "actions/Shared";

import { getExecCycles } from "selectors/ExecCycle";
import { isLoading } from "selectors/Shared";

const mapStateToProps = state => ({
    isLoading: isLoading(state),
    execCycles: getExecCycles(state)
});

const mapDispatchToProps = dispatch => ({
    reqExecCycles() {
        dispatch(actions.reqExecCycles());
    },
    onSave(execCycle) {
        dispatch(actions.reqSaveExecCycle(execCycle));
    },
    onSelect(execCycleId) {
        dispatch(actions.selectExecCycle(execCycleId));
    }
});

const ExecCycleListContainer = connect(mapStateToProps, mapDispatchToProps)(ExecCycleList);

export default ExecCycleListContainer;
