import React from "react";
import PropTypes from "prop-types";

import "sass/components/shared/ColumnFilter.scss";

class ColumnFilter extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            open: false,
            mouseDownInside: false
        };
        this.handleFilter = this.handleFilter.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.onClickOutside = this.onClickOutside.bind(this);
    }
    componentDidMount() {
        document.addEventListener("mousedown", this.onClickOutside, false);
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.onClickOutside);
    }
    handleFilter(value) {
        this.props.onChange(value);
        this.setState({ open: false });
    }
    handleMouseDown() {
        this.setState({ mouseDownInside: true });
    }
    handleMouseUp() {
        this.setState({ mouseDownInside: false });
    }
    handleOpen() {
        this.setState({ open: true });
    }
    onClickOutside() {
        if(this.state.mouseDownInside)
            return;
        this.setState({ open: false });
    }
    render() {
        const { items = [], selected = null } = this.props;

        const { open } = this.state;

        return (<div className="column-filter"
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
        >
            <button className="btn-link filter" onClick={this.handleOpen}>
                <i className={`glyphicon glyphicon-filter ${selected ? "" : "text-muted"}`} />
            </button>
            <ul className={open ? "open" : ""}>
                {selected
                    ? <li className="clear" onClick={() => this.handleFilter(null)}>
                        <i className="glyphicon glyphicon-remove" />
                        {" "}
                        Clear
                    </li>
                    : null}
                {items.map(item => (<li
                    key={`filter-item-${item.id}`}
                    onClick={() => this.handleFilter(item)}
                    className={selected && selected.id==item.id ? "selected" : ""}
                >
                    {item.name}
                </li>))}
            </ul>
        </div>);
    }
};
ColumnFilter.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        name: PropTypes.string
    })),
    onChange: PropTypes.func.isRequired,
    selected: PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        name: PropTypes.string
    })
};

export default ColumnFilter;
