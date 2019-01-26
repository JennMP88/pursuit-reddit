const PrivateUserRoute2 = require('express').Router();
const bcrypt = require('bcrypt');
const UserService = require('../services/user');

PrivateUserRoute2.use(UserService.cheeseTokens);

// POST - CREATE USER
//PUT/user
userRouter.post('/:user_id', (req, res) => {
    const { username, email, password } = req.body;
    bcrypt.hash(password, 10)
    .then((cryptpassword)=>{
        return UserService.create(username, email, cryptpassword, user_id)
        .then(() => {
            res.json({ success: `user with username: ${username} created` });
        })
        .catch(err => {
            res.json(err.toString());
        })
    })
})

//DELETE
PrivateUserRoute2.delete('/:user_id', (req, res) => {
    const {user_id,} = req.params;
    UserService.deleteUser(user_id)
        .then(() => {
            res.json({
                success: `User is deleted`});
        })
        .catch(err => {
            res.json(err.toString());
            })
        })

module.exports = PrivateUserRoute2;