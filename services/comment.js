const pgp = require('pg-promise')({});
const db = pgp('postgres://localhost/blog');

const CommentService = {};

//POST /comment
CommentService.create = (author, post_id, title, body) => db.none(
    'INSERT INTO comments (author, post_id, title, body) VALUES (${author}, ${post_id}, ${title}, ${body})', {author, post_id, title, body}
);

//GET /comment/:comment_id
CommentService.read = comment_id => db.one(
    'SELECT title, body FROM comments WHERE id = ${comment_id}', {comment_id}
);

//PUT /comment/:comment_id
CommentService.update = (comment_id, title, body) => db.none(
    'UPDATE comments SET title = ${title}, body = ${body} WHERE id = ${comment_id}', {comment_id, title, body}
);

// DEL /comment/:comment_id
CommentService.delete = comment_id => db.none(
    'DELETE FROM comments WHERE id = ${comment_id}', {comment_id}
);

module.exports = CommentService;