const parseSelectorData = (arr, path) => {
    if(!path.length) {
        return arr
            .filter(tp => tp.testCases && tp.testCases.length)
            .map(tp => ({
                id: tp.id,
                name: tp.name,
                items: tp.testCases.map(tc => ({
                    id: tc,
                    name:`TC-${tc}`
                })),
                path,
                selectable: true
            }));
    } else {
        return arr.map(tc => ({
            id: tc.id,
            name: tc.name,
            path
        }));
    }
    return [];
};

export default parseSelectorData;
