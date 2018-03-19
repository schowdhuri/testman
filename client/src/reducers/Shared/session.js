import { RCV_LOGIN_STATUS } from "constants/SharedActions";

const initialState = {
    user: null
};

const loginReducer = (state=initialState, action) => {
    const { type } = action;
    switch(type) {
        case RCV_LOGIN_STATUS:
            return {
                ...state,
                user: action.user || null
            };
    }
    return state;
};

export default loginReducer;
