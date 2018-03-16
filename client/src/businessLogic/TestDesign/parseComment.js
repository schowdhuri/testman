const parseComment = (comment={}) => {
    return {
        id: comment.id,
        content: comment.content.value,
        created: comment.created,
        modified: comment.modified,
        user: comment.user
    };
};

export default parseComment;
