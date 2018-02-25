import React from "react";
import PropTypes from "prop-types";

import { Modal } from "react-bootstrap";

import GroupMultiSelect from "components/Shared/GroupMultiSelect";

import "sass/components/TestCaseSelector.scss";

class Selector extends React.Component {
    componentDidMount() {
        this.props.onInit(this.props.execCycle);
    }
    render() {
        const {
            allowAdd,
            allowAddFolder,
            items,
            onChangePath,
            onDeselect,
            onDeselectAll,
            onSelect,
            onSelectAll,
            readOnly,
            selectedItems
        } = this.props;
        return (<div className="test-case-selector">
            <GroupMultiSelect
                items={items}
                allowAdd={allowAdd}
                allowAddFolder={allowAddFolder}
                onChangePath={onChangePath}
                onDeselectAll={onDeselectAll}
                onDeselectItem={onDeselect}
                onSelectItem={onSelect}
                onSelectAll={onSelectAll}
                selectedItems={selectedItems}
                readOnly={readOnly} />
        </div>);
    }
}

export default Selector;
