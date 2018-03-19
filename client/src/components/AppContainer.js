import { connect } from "react-redux";

import App from "./App";

import { reqLoginStatus } from "actions/Shared";

import { isLoading } from "selectors/Shared";

const mapStateToProps = state => ({
    isLoading: isLoading(state)
});

const mapDispatchToProps = dispatch => ({
    checkLogin() {
        dispatch(reqLoginStatus());
    }
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
