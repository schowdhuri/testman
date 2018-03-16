const parseSelectorData = (arr, path) => {
    if(!path.length) {
        return arr
            .filter(tp => tp.testCases && tp.testCases.length)
            .map(tp => ({
                id: tp.id,
                name: tp.name,
                items: tp.testCases.map(tc => ({
                    id: tc,
                    name:`Test-${tc}`
                })),
                path,
                selectable: true
            }));
    } else {
        return arr.map(tc => ({
            id: tc.id,
            name: tc.name,
            testPlan: tc.testPlan,
            path
        }));
    }
    return [];
};

export default parseSelectorData;
