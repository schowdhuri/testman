import React from "react";
import PropTypes from "prop-types";

import Selector from "components/TestSelector";

class TestImporter extends React.Component {
    constructor(props) {
        super(props);
        this.handleInit = this.handleInit.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }
    handleInit() {
        this.props.onInit(this.props.execCycle);
    }
    handleSave(selectedItems, preSelectedItems) {
        this.props.onSave(
            this.props.execCycle,
            selectedItems,
            preSelectedItems
        );
    }
    render() {
        const { show, onClose } = this.props;
        return (<Selector
            show={show}
            onInit={this.handleInit}
            onClose={onClose}
            onSave={this.handleSave} />);
    }
}

export default TestImporter;
