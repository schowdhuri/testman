import React from "react";
import PropTypes from "prop-types";
import Alert from "react-s-alert";

import Header from "./Header";


// import "node_modules/bootstrap/dist/css/bootstrap-theme.min.css"

class App extends React.Component {
    render() {
        return (<div>
            <Header />
            {this.props.children}
            <Alert position="top" effect="stackslide" stack={{ limit: 2 }} />
        </div>);
    }
}
App.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.array
    ])
};

export default App;
