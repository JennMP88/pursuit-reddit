const express = require('express');
const userRouter = express.Router();
const UserService = require('../services/user');


// POST /user- CREATE USER
userRouter.post('/', (req, res) => {
    const { username, email, password } = req.body
        UserService.create(username, email, password)
        .then(() => {
            res.json({ success: `user with username: ${username} created` });
        })
        .catch(err => {
            res.json(err.toString());
        })
    })


// GET - READ USER
//GET /user/:user_id
userRouter.get('/:user_id', (req, res) => {
    const { user_id } = req.params;
    console.log("hello")
    console.log(user_id)
    UserService.read(user_id)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err.toString());
        })
});

// PUT - UPDATE USER
//--PRIVATE?
userRouter.put('/:user_id', (req, res) => {
    const { user_id } = req.params;
    console.log(req.params)
    const { username, email, password } = req.body;
    console.log("hi2")
    console.log(user_id)
    UserService.update(user_id, username, email,password)
        .then(() => {
            res.json({ success: `user with username: ${user_id} updated` });

        })
        .catch(err => {
            res.json(err.toString());
        })
});

// //DELETE PRIVATE 
// userRouter.delete('/:user_id', (req, res) => {
//     const { user_id } = req.params;
//     UserService.delete(user_id)
//         .then(() => {
//             res.json(`Deleted user: ${user_id}`);
//         })
//         .catch(err => {
//             res.json(err.toString())
//         })
// });

// DELETE - DELETE USER
userRouter.delete('/:user_id', (req, res) => {
    const { user_id } = req.params;

    UserService.delete(user_id)
        .then(() => {
            res.json({ success: `user with ID: ${user_id} deleted.` });
        })
        .catch(err => {
            res.json(err.toString());
        })
});

//GET /user/:user_id/posts
userRouter.get('/:user_id/posts', (req, res) => {
    const { user_id } = req.params;
    console.log(user_id)
    UserService.read2(user_id)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err.toString());
        })
});

//GET /user/:user_id/posts/:post_id
userRouter.get('/:user_id/posts/:post_id', (req, res) => {
    const { user_id, post_id } = req.params;

    UserService.read3(user_id, post_id)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err.toString());
        })
});

//GET /user/:user_id/comments
userRouter.get('/:user_id/comments', (req, res) => {
    const { user_id } = req.params;

    UserService.read4(user_id)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err.toString());
        })
});

//GET  /user/:user_id/comments/:comment_id
userRouter.get('/:user_id/comments/:comment_id', (req, res) => {
    const { user_id, comment_id } = req.params;

    UserService.read5(user_id, comment_id)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err.toString());
        })
});


//--- LOGIN USER 
// POST /user/login
userRouter.post('/login', (req,res)=> {
    const {id, username, password } = req.body; 
    userService.readUser(id).then((user)=>{
        if(username === user.username){
         return bcrypt.compare(password, user.password) 
        }
    })
    .then(response=>{
        if(!response) throw new Error('Input is incorrect')
        const token = uuidv1();
        console.log(id,token)
        userService.updateTokenUser(token,id );
        res.json({
            status: 'Successful',
            token: token
        });
    })
    .catch(err => {
        res.status(400).json({ error: err.toString()})
    })
 })

module.exports = userRouter;