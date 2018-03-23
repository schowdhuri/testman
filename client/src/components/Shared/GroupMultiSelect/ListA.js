import React from "react";
import PropTypes from "prop-types";

import Breadcrumb from "./Breadcrumb";
import Filter from "./Filter";
import UnselectedItem from "./UnselectedItem";

class ListA extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelectAll = this.handleSelectAll.bind(this);
        this.handleSelectItem = this.handleSelectItem.bind(this);
    }
    handleSelectAll() {
        if(!this.props.readOnly)
            this.props.onSelectAll(this.props.unselectedItems);
    }
    handleSelectItem(item) {
        if(!this.props.readOnly)
            this.props.onSelectItem(item, this.props.path);
    }
    render() {
        const {
            allowAdd,
            allowAddFolder,
            filterText,
            onFilter,
            onNav,
            onNavDown,
            onNavUp,
            path,
            showFilter,
            unselectedItems
        } = this.props;

        return (<div className={`left ${showFilter!==false ? "has-filter" : ""}`}>
            <div className="list-header">
                <Breadcrumb
                    onNav={onNav}
                    onNavUp={onNavUp}
                    path={path} />
                {showFilter !== false ? <div className="list-search">
                    <i className="glyphicon glyphicon-search" />
                    <Filter value={filterText} onFilter={onFilter} />
                </div> : null}
            </div>
            <div className="multiselect-list-wrapper">
                <ul className="items">
                    {unselectedItems ? unselectedItems.map(item => (<UnselectedItem
                        key={item.id}
                        allowAdd={allowAdd}
                        allowAddFolder={allowAddFolder}
                        item={item}
                        onSelectItem={this.handleSelectItem}
                        onNavDown={onNavDown} />)) : null}
                </ul>
            </div>
        </div>);
    }
}
ListA.propTypes = {
    allowAdd: PropTypes.bool,
    allowAddFolder: PropTypes.bool,
    allowSelectAll: PropTypes.bool,
    filterText: PropTypes.string,
    onFilter: PropTypes.func.isRequired,
    onNav: PropTypes.func.isRequired,
    onNavDown: PropTypes.func.isRequired,
    onNavUp: PropTypes.func.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    onSelectAll: PropTypes.func.isRequired,
    path: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired
    })),
    readOnly: PropTypes.bool,
    showFilter: PropTypes.bool,
    unselectedItems: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired
    })).isRequired
};

export default ListA;
