import React from "react";
import PropTypes from "prop-types";
import Alert from "react-s-alert";

import LoadingOverlay from "./Shared/LoadingOverlay";
import Header from "./Shared/Header";

class App extends React.Component {
    componentDidMount() {
        this.props.checkLogin();
    }
    render() {
        const { navId } = this.props;
        return (<div className="app">
            <Header navId={navId} />
            <main>
                {this.props.children}
            </main>
            <Alert position="top" effect="stackslide" stack={{ limit: 2 }} />
            <LoadingOverlay loading={this.props.isLoading} />
        </div>);
    }
}
App.propTypes = {
    checkLogin: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.array
    ]),
    isLoading: PropTypes.bool.isRequired
};

export default App;
