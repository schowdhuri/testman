import deepEqual from "deep-equal";
import React from "react";
import PropTypes from "prop-types";

import ListA from "./ListA";
import ListB from "./ListB";

import "sass/components/shared/GroupMultiSelect.scss";

class GroupMultiSelect extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.onInit(this.props.cid);
    }
    componentWillReceiveProps(nextProps) {
        if(!deepEqual(nextProps.path, this.props.path))
            this.props.onChangePath(nextProps.path);
    }
    componentWillUnmount() {
        this.props.onDestroy();
    }
    render() {
        const {
            filterText,
            unselectedItems,
            onDeselectAll,
            onDeselectItem,
            onFilter,
            onNav,
            onNavDown,
            onNavUp,
            onSelectAll,
            onSelectItem,
            path,
            readOnly,
            selectedItems,
            showFilter
        } = this.props;

        const listAProps = {
            filterText,
            onFilter,
            onNav,
            onNavDown,
            onNavUp,
            onSelectAll,
            onSelectItem,
            path,
            readOnly,
            showFilter,
            unselectedItems
        };
        const listBProps = {
            onDeselectItem,
            onDeselectAll,
            readOnly,
            selectedItems
        };
        return (<div className={`two-way-group-list ${readOnly ? "readonly" : ""}`}>
            <ListA {...listAProps} />
            <ListB {...listBProps} />
        </div>);
    }
}
GroupMultiSelect.propTypes = {
    cid: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    unselectedItems: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired
    })),
    selectedItems: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]).isRequired,
        name: PropTypes.string.isRequired,
        include: PropTypes.bool
    })).isRequired,
    filterText: PropTypes.string,
    onChangePath: PropTypes.func.isRequired,
    onInit: PropTypes.func.isRequired,
    onNav: PropTypes.func,
    onNavDown: PropTypes.func,
    onNavUp: PropTypes.func,
    onDestroy: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    onSelectAll: PropTypes.func.isRequired,
    onDeselectItem: PropTypes.func.isRequired,
    onDeselectAll: PropTypes.func.isRequired,
    path: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired
    })),
    readOnly: PropTypes.bool,
    showFilter: PropTypes.bool
};

export default GroupMultiSelect;
