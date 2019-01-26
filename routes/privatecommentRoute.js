const PrivateRouter3 = require('express').Router();
const CommentService = require('../services/comment');
const {cheeseTokens} = require('../services/user');

PrivateRouter3.use(cheeseTokens);


PrivateRouter3.post('/', (request, response) => {
    const {author, post_id, title, body,} = request.body;
    CommentService.createComment(author, post_id, title, body)
        .then(() => {
            response.json({
                success: `Successfully posted.`,
            });
        })
        .catch(err => {
            res.json(err.toString());
            })
        });

PrivateRouter3.put('/:comment_id', (request, response) => {
    const {comment_id,} = request.params;
    const {title, body,} = request.body;
    CommentService.updateComment(comment_id, title, body)
        .then(() => {
            response.json({
                success: `Successfully updated.`,
            });
        })
        .catch(err => {
            res.json(err.toString());
            })
        });


PrivateRouter3.delete('/:comment_id', (request, response) => {
    const {comment_id,} = request.params;
    CommentService.deleteComment(comment_id)
        .then(() => {
            response.json({
                success: `Successfully deleted.`,
            });
        })
        .catch(err => {
            res.json(err.toString());
            })
        });


module.exports = PrivateRouter3;