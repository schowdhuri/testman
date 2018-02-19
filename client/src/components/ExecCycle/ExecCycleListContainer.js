import { connect } from "react-redux";
import ExecCycleList from "./ExecCycleList";

import * as actions from "actions/ExecCycle";
import { redirectToTestPlan } from "actions/Shared";

import { getExecCycles, getSelectedExecCycle } from "selectors/ExecCycle";
import { isLoading } from "selectors/Shared";

const mapStateToProps = state => ({
    selected: getSelectedExecCycle(state),
    isLoading: isLoading(state),
    execCycles: getExecCycles(state)
});

const mapDispatchToProps = dispatch => ({
    reqExecCycles() {
        dispatch(actions.reqExecCycles());
    },
    onDeleteExecCycle(execCycle) {
        dispatch(actions.reqDeleteExecCycle(execCycle));
    },
    onSave(execCycle) {
        dispatch(actions.reqSaveExecCycle(execCycle));
    },
    onSelect(execCycle) {
        dispatch(actions.selectExecCycle(execCycle));
    }
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps
});

const ExecCycleListContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(ExecCycleList);

export default ExecCycleListContainer;
