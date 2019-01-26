const pgp = require('pg-promise')({});
const db = pgp('postgres://localhost/blog');

const PostService={}
//-----------------------------------------POST

//POST /post
PostService.create = (author, title, body) => db.none(
  'INSERT INTO posts (author, title, body) VALUES (${author}, ${title}, ${body})', {author, title, body}
);

// GET /post/:post_id
PostService.read20 = (post_id) => {
  return db.any("SELECT * FROM posts WHERE id=${post_id}", {post_id})
}

// PUT /post/:post_id
PostService.update = (post_id, title, body) => db.none(
  'UPDATE posts SET title = ${title}, body = ${body} WHERE id = ${post_id}', {post_id, title, body}
);

// DEL /post/:post_id
PostService.delete = (post_id) => db.none(
  'DELETE FROM comments WHERE post_id = ${post_id}; DELETE FROM posts WHERE id = ${post_id}', {post_id}
);

//GET /post/:post_id/comments
PostService.read21 = (post_id) => db.any(
  'SELECT posts.author, posts.title, posts.body, comments.title, comments.body FROM posts JOIN comments ON posts.id = comments.post_id WHERE comments.post_id = ${post_id}', {post_id,}
);

//GET /post/:post_id/comments/:comment_id
PostService.read22 = (post_id, comment_id) => db.one(
  'SELECT posts.author, posts.title, posts.body, comments.title, comments.body FROM posts JOIN comments ON posts.id = comments.post_id WHERE comments.post_id = ${post_id} AND comments.id = ${comment_id}', {post_id, comment_id,}
);




  module.exports = PostService;