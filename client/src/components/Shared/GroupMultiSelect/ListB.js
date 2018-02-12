import React from "react";
import PropTypes from "prop-types";

const ListB = ({ selectedItems, onDeselectItem, onDeselectAll, readOnly }) => {
    const leaves = selectedItems ? selectedItems.filter(item => !item.isGroup) : null;
    if(readOnly) {
        onDeselectAll = () => {};
        onDeselectItem = () => {};
    }
    return (<div className="right">
        <div className="list-header">
            {leaves
                ? <label className="excluded">{leaves.length===1
                    ? "1 item selected"
                    : leaves.length + " items selected"}
                </label>
                : null}
            {leaves.length
                ? <button onClick={onDeselectAll} className="btn-select-all btn-link">Remove All</button>
                : null}
        </div>
        <div className="multiselect-list-wrapper">
            <ul className="items">
                {selectedItems ? selectedItems.map(item => {
                    if(item.isGroup) {
                        return (<li className="group" key={item.id}>{item.name}</li>);
                    }
                    return (<li key={item.id} onClick={()=>{onDeselectItem(item);}}>
                        {item.hasChildren ? <i className="glyphicon glyphicon-folder-close" /> : null}
                        {item.name}
                        <i className="glyphicon glyphicon-remove" />
                    </li>);
                }) : null}
            </ul>
        </div>
    </div>);
};
ListB.propTypes = {
    selectedItems: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired
    })).isRequired,
    readOnly: PropTypes.bool,
    onDeselectItem: PropTypes.func.isRequired,
    onDeselectAll: PropTypes.func.isRequired
};

export default ListB;
