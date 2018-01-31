import flatten from "./flatten";

const getUnselectedItems = (items, filterText, selectedItems=[], path) => {
    const arr = [];
    let currentLevel;
    if(path && path instanceof Array) {
        path.forEach(level => {
            currentLevel = items.find(item => item.id === level.id);
            items = currentLevel.items;
        });
    }
    // remove individual items if 'all' selected
    const allItem = items.find(item => item.all);
    if(!(allItem && selectedItems.find(item => item.id === allItem.id))) {
        items.forEach(item => {
            if(item.items) {
                const leaves = flatten(item);
                const remaining = leaves.filter(leaf =>
                    !selectedItems.find(selectedItem => selectedItem.id === leaf.id));
                const folderSelected = selectedItems.find(selectedItem => selectedItem.id === item.id);
                if((item.include || remaining.length) && !folderSelected){
                    arr.push(item);
                }
            } else {
                if(!selectedItems.find(y => y.id === item.id))
                    arr.push(item);
            }
        });
    }
    if(filterText && arr && !arr.find(item => (item.items))) { // <- filter leaves only
        filterText = filterText.toLowerCase();
        return arr.filter(item => {
            if(item.items) {
                const leaves = flatten(item);
                return leaves.find(leaf => leaf.name.toLowerCase().indexOf(filterText) >= 0);
            } else {
                if(typeof(item.name)!=="string")
                    return false;
                return item.name.toLowerCase().indexOf(filterText) >= 0;
            }
        });
    }
    return arr;
};

export default getUnselectedItems;
