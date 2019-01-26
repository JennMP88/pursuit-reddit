const express = require('express');
const postRouter = express.Router();
const PostService = require('../services/post');

//------------------------------------POST 
// POST - CREATE USER
//POST /user
postRouter.post('/post', (req, res) => {
    const {author,title, body} = req.body;
    PostService.create(author,title, body)
      .then(() => {
        res.json({success:`post with author id: ${author} created`});
        
      })
      .catch(err => {
        res.json(err.toString());
      })
  });
  
  // GET - READ USER
  //GET /post/:post_id
  postRouter.get('/:post_id', (req, res) => {
    const {post_id} = req.params;
      console.log("i am reading post")
      console.log(post_id)
    postService.read20(post_id)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json(err.toString());
      })
  });

// PUT - UPDATE USER
postRouter.put('/:post_id', (req, res) => {
    const {post_id}=req.params;
    console.log(req.params)
    const {title, body}=req.body;
    console.log("aloha, keep going")
    console.log(post_id)
    PostService.update(post_id,title,body)
    .then(() => {
      res.json({success:`Reading post with id: ${post_id} updated`});
      
    })
      .catch(err => {
        res.json(err.toString());
      })
  });
  
  // DELETE - DELETE USER
  postRouter.delete('/:post_id', (req, res) => {
    const {post_id} = req.params;
  
    PostService.delete(post_id)
      .then(() => {
        res.json({ success: `Post ID: ${id} deleted.`});
      })
      .catch(err => {
        res.json(err.toString());
      })
  });

  //GET /post/:post_id/comments
 postRouter.get('/:post_id/comments', (request, response) => {
    const {post_id,} = request.params;
    PostService.read21(post_id)
        .then(data => {
            response.json(data);
        })
        .catch(err => {
            console.log(err);
            response.json({
                'error': 'Something went wrong.',
            });
        });
});

//GET /post/:post_id/comments/:comment_id
postRouter.get('/:post_id/comments/:comment_id', (request, response) => {
    const {post_id, comment_id,} = request.params;
    PostService.read22(post_id, comment_id)
        .then(data => {
            response.json(data);
        })
        .catch(err => {
            response.json({
                'error': `Something went wrong.`,
            });
        });
});



module.exports = postRouter;