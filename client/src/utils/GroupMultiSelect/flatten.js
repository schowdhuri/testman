function flatten(node, list=[]) {
    if(!node)
        return list;
    if(node.items) {
        // has children
        return node.items.reduce((prev, cur) => {
            const desc = flatten(cur);
            return [
                ...prev,
                ...desc
            ];
        }, list);
    }
    // is a leaf
    return [
        ...list,
        node
    ];
}

export default flatten;
