import React from "react";
import PropTypes from "prop-types";

import DefectList from "./DefectListContainer";

import "sass/components/Defects.scss";

class ListView extends React.Component {
    render() {
        const { mode, testID } = this.props;
        return (<div className="defects list">
            <DefectList  />
        </div>);
    }
}
ListView.propTypes = {
    mode: PropTypes.string
};

export default ListView;
