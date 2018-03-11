import * as ACTIONS from "constants/SharedActions";

const initialState = {
    all: []
};

const usersReducer = (state=initialState, action) => {
    const { type } = action;
    switch(type) {
        case ACTIONS.RCV_USERS:
            return {
                ...state,
                all: action.users
            };
    }
    return state;
};

export default usersReducer;
