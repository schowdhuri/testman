const buildComment = data  => {
    const comment = {
        content: {
            value: data.content
        }
    };
    if(data.id)
        comment.id = data.id;
    if(data.attachments) {
        const attachments = [];
        const files = [];
        data.attachments.forEach(a => {
            if(a instanceof File)
                files.push(a);
            else
                attachments.push({ id: a.id });
        });
        comment.content.attachments = attachments;
        comment.files = files;
    }
    return comment;
};

export default buildComment;
