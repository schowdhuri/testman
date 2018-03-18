import React from "react";
import PropTypes from "prop-types";

import "sass/components/LoadingOverlay.scss";

const LoadingOverlay = ({ loading, message }) => {
    return (<div className={`loading-overlay ${loading ? "show" : ""}`}>
        {loading
            ? <div className="box">
                <i className="glyphicon glyphicon-repeat spin" />
                <div className="message">{message || "Loading ..."}</div>
            </div>
            : null}
    </div>);
};
LoadingOverlay.propTypes = {
    loading: PropTypes.bool.isRequired,
    message: PropTypes.string
};

export default LoadingOverlay;
