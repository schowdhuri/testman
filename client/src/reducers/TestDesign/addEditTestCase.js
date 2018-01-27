import * as ACTIONS from "constants/TestDesignActions";

const initialState = {
    name: "",
    description: {
        value: ""
    }
};

const testCases = (state=initialState, action) => {
    const { type } = action;
    switch(type) {
        case ACTIONS.RCV_TEST_CASE:
            return action.testCase;

        case ACTIONS.CHANGE_TC_DESCR:
            return {
                ...state,
                description: {
                    ...state.description,
                    value: action.value
                }
            };

        case ACTIONS.CHANGE_TC_NAME:
            return {
                ...state,
                name: action.value
            };

        case ACTIONS.RESET_TC_ADD_EDIT:
            return initialState;
    }
    return state;
};

export default testCases;
