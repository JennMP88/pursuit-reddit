const express = require('express');
const commentRouter = express.Router();
const CommentService = require('../services/comment');

//POST /comment -create 
commentRouter.post('/post', (req, res) => {
    const {author,post_id, title,body} = req.body;
    CommentService.create(author,post_id,title, body)
      .then(() => {
        res.json({success:`comment with author id: ${author} created`});
        
      })
      .catch(err => {
        res.json(err.toString());
      })
  });

//GET /comment/:comment_id
commentRouter.get('/:comment_id', (request, response) => {
    const {comment_id,} = request.params;
    CommentService.read(comment_id)
        .then(data => {
            response.json(data);
        })
        .catch(err => {
            console.log(err);
            response.json({
                'err': `There is an error.`,
            });
        });
});

// PUT - UPDATE COMMENT
// /comment/:comment_id
commentRouter.put('/:post_id', (req, res) => {
    const {comment_id}=req.params;
    console.log(req.params)
    const {title, body}=req.body;
    console.log("aloha, keep going")
    console.log(post_id)
    CommentService.update(comment_id,title,body)
    .then(() => {
      res.json({success:`Reading post with id: ${post_id} updated`});
      
    })
      .catch(err => {
        res.json(err.toString());
      })
  });
  
  // DELETE - DELETE COMMENT
  // /comment/:comment_id
  commentRouter.delete('/:comment_id', (req, res) => {
    const {comment_id} = req.params;
  
    CommentService.delete(comment_id)
      .then(() => {
        res.json({ success: `Comment ID: ${id} deleted.`});
      })
      .catch(err => {
        res.json(err.toString());
      })
  });

module.exports = commentRouter;