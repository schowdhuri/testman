import { connect } from "react-redux";

import App from "./App";

import * as actions from "actions/TestDesign";

import { isLoading } from "selectors/Shared";

const mapStateToProps = state => ({
    isLoading: isLoading(state)
});

const AppContainer = connect(mapStateToProps)(App);

export default AppContainer;
