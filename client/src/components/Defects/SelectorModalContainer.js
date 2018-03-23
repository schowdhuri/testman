import { connect } from "react-redux";

import SelectorModal from "./SelectorModal";

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClose() {
        if(typeof(ownProps.onClose)==="function")
            ownProps.onClose();
    }
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        ...stateProps,
        ...dispatchProps,
        ...ownProps
    };
};

const SelectorModalContainer = connect(undefined, mapDispatchToProps, mergeProps)(SelectorModal);

export default SelectorModalContainer;
