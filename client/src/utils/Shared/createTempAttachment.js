import shortId from "shortid";

import dateFormat from "common/utils/dateFormat";

const createTempAttachment = file => ({
    created: dateFormat(),
    name: file.name,
    path: file.preview,
    file,
    _id: shortId.generate()
});

export default createTempAttachment;
