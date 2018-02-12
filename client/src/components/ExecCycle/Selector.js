import React from "react";
import PropTypes from "prop-types";

import { Modal } from "react-bootstrap";

import GroupMultiSelect from "components/shared/GroupMultiSelect";

import "sass/components/TestCaseSelector.scss";

class Selector extends React.Component {
    componentDidMount() {
        this.props.onInit(this.props.selectedItems);
    }
    render() {
        const {
            items,
            onChangePath,
            onDeselect,
            onDeselectAll,
            onSelect,
            onSelectAll,
            selectedItems
        } = this.props;
        return (<div className="test-case-selector">
            <GroupMultiSelect
                items={items}
                onChangePath={onChangePath}
                onDeselectAll={onDeselectAll}
                onDeselectItem={onDeselect}
                onSelectItem={onSelect}
                onSelectAll={onSelectAll}
                selectedItems={selectedItems}
                readOnly={false} />
        </div>);
    }
}

export default Selector;
