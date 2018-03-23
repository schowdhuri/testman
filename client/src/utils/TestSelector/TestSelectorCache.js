const getItemsOnLevel = (arr, path) => {
    if(!path.length)
        return arr;
    const cur = path.shift();
    const nextLevel = arr.find(node => node.id===cur.id);
    if(!nextLevel)
        throw new Error("Unable to parse");
    return getItemsByPath(nextLevel.items, path);
};

const addMeta = node => {
    let hasChildren = false;
    if((node.items && node.items.length) || node.hasChildren) {
        hasChildren = true;
    }
    return {
        ...node,
        items: undefined,
        hasChildren
    };
};

const getItemsByPath = (arr=[], path=[]) => {
    return getItemsOnLevel(arr, path).map(addMeta);
};

const findPath = (arr, item, path=[]) => {
    const found = arr.find(n => n.id===item.id);
    if(found) {
        return {
            found: addMeta(found),
            path
        };
    }
    for(let i=0, len=arr.length; i<len; i++) {
        const node = arr[i];
        if(node.items) {
            const result = findPath(node.items, item, [ ...path, { id: node.id, name: node.name }]);
            if(result.found) {
                return result;
            }
        }
    }
    return {
        found: false
    };
};

const addChildren = (arr=[], children=[], path=[]) => {
    let node;
    for(let i=0; i<path.length; i++) {
        const levelId = path[i].id;
        node = arr.find(n => n.id===levelId);
    }
    node.items = children;
};

class TCSelectorCache {
    constructor() {
        this.data = [];
    }
    addDetails(items) {
        return items.map(item => {
            const result = findPath(this.data, item);
            const obj = result.found || item;
            return {
                ...obj,
                path: result.found ? result.path : undefined
            };
        });
    }
    getByPath(path=[]) {
        return getItemsByPath(this.data, [ ...path ]);
    }
    isStale() {
        return !this.data || !this.data.length;
    }
    save(data, path) {
        if(!path || !path.length) {
            this.data = data;
        } else {
            addChildren(this.data, data, path);
        }
    }
}

const tcSelectorCache = new TCSelectorCache();

export default tcSelectorCache;
