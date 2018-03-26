import * as ACTIONS from "constants/DashboardActions";

const initialState = {
    recentComments: [],
    defects: [],
    execCycles: []
};

const dashboardReducer = (state=initialState, action) => {
    switch(action.type) {
        case ACTIONS.RCV_SUMMARY:
            return {
                ...initialState,
                ...action.summary
            };
    }
    return state;
};

export default dashboardReducer;
