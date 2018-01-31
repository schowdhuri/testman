const shouldShowFilter = items => {
    // show filter when only leaf nodes are visible
    return items.length > 0 && !items.find(item => (item.items && item.items.length) || item.noSelectAll === true);
};

export default shouldShowFilter;
