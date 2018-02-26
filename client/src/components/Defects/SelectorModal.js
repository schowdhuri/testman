import React from "react";
import PropTypes from "prop-types";

import Selector from "components/TestSelector";

class SelectorModal extends React.Component {
    constructor(props) {
        super(props);
        this.handleInit = this.handleInit.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }
    handleInit() {
        // this.props.onInit(this.props.execCycle);
    }
    handleSave(selectedItems, preSelectedItems) {
        this.props.onSave(selectedItems);
    }
    render() {
        const {
            allowAdd,
            allowAddFolder,
            show,
            onClose,
            importActionContract
        } = this.props;
        return (<Selector
            allowAdd={allowAdd}
            allowAddFolder={allowAddFolder}
            show={show}
            importActionContract={importActionContract}
            onInit={this.handleInit}
            onClose={onClose}
            onSave={this.handleSave} />);
    }
}

export default SelectorModal;
