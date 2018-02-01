// returns true is node1 is descendant of node2
const isChildOf = (node1, node2) => {
    const parentPath = [
        ...node2.path,
        { id: node2.id }
    ];

    if(node1.path.length < parentPath.length)
        return false;
    for(let i=0; i<parentPath.length; i++) {
        if(node1.path[i].id !== parentPath[i].id) {
            return false;
        }
    }
    return true;
};

export default isChildOf;
