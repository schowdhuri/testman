import React from "react";
import PropTypes from "prop-types";

const Filter = ({ value, onFilter }) => {
    let txtFilter;
    return (
        <input className="filter form-control"
            type="text"
            placeholder="Search"
            onChange={() => { onFilter(txtFilter.value); }}
            ref={el=>{ txtFilter = el; }}
            value={value} />
    );
};
Filter.propTypes = {
    value: PropTypes.string,
    onFilter: PropTypes.func.isRequired
};

export default Filter;
