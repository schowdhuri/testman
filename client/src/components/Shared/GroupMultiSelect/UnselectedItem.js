import React from "react";
import PropTypes from "prop-types";

class UnselectedItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.hasChildren = this.hasChildren.bind(this);
    }
    handleAdd(ev) {
        if(this.hasChildren()) {
            if(this.props.item.selectable) {
                this.props.onSelectItem(this.props.item);
            }
        } else {
            this.props.onSelectItem(this.props.item);
        }
        ev.stopPropagation();
    }
    handleClick() {
        if(this.hasChildren()) {
            this.props.onNavDown(this.props.item);
        } else {
            this.props.onSelectItem(this.props.item);
        }
    }
    hasChildren() {
        const { item } = this.props;
        return (item.items instanceof Array && item.items.length) || item.hasChildren;
    }
    render() {
        const { item } = this.props;

        return (<li onClick={this.handleClick}>
            {this.hasChildren() ? <i className="fa fa-folder" /> : null}
            {item.name}

            {item.selectable || !this.hasChildren()
                ? <i className="fa fa-plus" onClick={this.handleAdd}/>
                : null}
        </li>);
    }
}
UnselectedItem.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        items: PropTypes.array,
        include: PropTypes.bool,
        selectable: PropTypes.bool,
        type: PropTypes.string
    }),
    onNavDown: PropTypes.func,
    onSelectItem: PropTypes.func
};

export default UnselectedItem;
