import React from "react";
import PropTypes from "prop-types";
import Alert from "react-s-alert";

class App extends React.Component {
    render() {
        return (<div>
            <h1>Common element</h1>
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
