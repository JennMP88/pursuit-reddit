const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 8000;

const userRouter = require('./routes/user');
const postRouter= require('./routes/post');
const commentRouter= require('./routes/comment');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// user routes
app.use('/user', userRouter);
//Post routes
app.use('/post', postRouter);
//comment routes
app.use('/comment', commentRouter);


app.listen(port, () => {
  console.log('Blog is running on Port: '+port);
});

/*
-created a route called user, then you're app.using it
HOME ROUTE for users 
  /user 
    -post
    /id
      -returns an id
      -two options to put and delete with this route

*/