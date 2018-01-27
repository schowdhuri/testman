import React from "react";
import PropTypes from "prop-types";
import Alert from "react-s-alert";

import LoadingOverlay from "./Shared/LoadingOverlay";
import Header from "./Shared/Header";

class App extends React.Component {
    render() {
        return (<div className="app">
            <Header />
            <main>
                {this.props.children}
            </main>
            <Alert position="top" effect="stackslide" stack={{ limit: 2 }} />
            <LoadingOverlay loading={this.props.isLoading} />
        </div>);
    }
}
App.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.array
    ])
};

export default App;
