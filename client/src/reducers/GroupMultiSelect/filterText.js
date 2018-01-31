import { FILTER_LIST, NAV_DOWN, NAV_UP, NAV_TO } from "constants/groupMultiSelectActions";

const filterReducer = (state="", actions) => {
    const { type } = actions;
    switch(type) {
        case FILTER_LIST:
            return actions.filterText;

        case NAV_DOWN:
        case NAV_UP:
        case NAV_TO:
            return "";
    }
    return state;
};

export default filterReducer;
