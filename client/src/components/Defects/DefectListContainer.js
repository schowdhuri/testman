import { connect } from "react-redux";
import DefectList from "./DefectList";

import * as actions from "actions/Defects";

import { getDefects } from "selectors/Defects";
import { isLoading } from "selectors/Shared";

const mapStateToProps = state => ({
    isLoading: isLoading(state),
    defects: getDefects(state)
});

const mapDispatchToProps = dispatch => ({
    fetchDefects() {
        dispatch(actions.reqDefects());
    }
});

const DefectListContainer = connect(mapStateToProps, mapDispatchToProps)(DefectList);

export default DefectListContainer;
