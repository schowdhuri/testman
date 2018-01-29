import * as ACTIONS from "constants/DefectsActions";

const initialState = {
    name: "",
    description: {
        value: ""
    },
    comments: [],
    testCases: [],
    newComment: ""
};

const addEditDefect = (state=initialState, action) => {
    const { type } = action;
    switch(type) {

    }
    return state;
};

export default addEditDefect;
