import * as ACTIONS from "constants/TestDesignActions";

const initialState = [];

const testCases = (state=initialState, action) => {
    const { type } = action;
    switch(type) {
        case ACTIONS.RCV_TEST_CASES:
            return action.testCases;
    }
    return state;
};

export default testCases;
