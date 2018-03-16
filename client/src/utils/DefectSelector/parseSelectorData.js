const parseSelectorData = arr => arr
    .map(def => ({
        id: def.id,
        name: def.name,
        items: [],
        path: []
    }));

export default parseSelectorData;
