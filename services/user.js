const pgp = require('pg-promise')({});
const db = pgp('postgres://localhost/blog');

const UserService = {};

//creates post of user
//POST /user
UserService.create = (username,email,password) => {
  return db.none('INSERT INTO users(username,email,password) VALUES (${username}, ${email}, ${password})',{username,email,password}) 
}

//reads a particular user given an id 
//GET /user/:user_id
UserService.read = (id) => {
 console.log("hoy")
  return db.one("SELECT username FROM users WHERE id=${id}", {id})
}

//PUT user/:user_id
//updates info
UserService.put = (username, email, password,user_id) => {
    console.log("hoy")
     return db.one("UPDATE users SET username=${username}, email=${email}, password=${password} WHERE id=${user_id}", {username, email, password,user_id})
   }

//DEL /user/:user_id
UserService.delete = (user_id) => {
    return db.none("DELETE FROM users WHERE id=${user_id}",{user_id})
  }

//gets all post posted from a particular userid
//GET /user/:user_id/posts
UserService.read2 = (user_id) => {
    console.log("work it")
    return db.any("SELECT posts.id, posts.author, posts.title, posts.body FROM posts users JOIN posts ON users.id=posts.author WHERE users.id=${user_id}" ,{user_id})
  }

//get all the post with the post id from the user id
//GET /user/:user_id/posts/:post_id
UserService.read3 = (user_id, post_id) => {
    // return db.any("SELECT * FROM posts WHERE author=${user_id} AND id=${post_id}", {user_id,post_id})
    return db.any("SELECT b.title, b.body FROM users a JOIN posts b ON a.id=b.author WHERE a.id=${user_id} AND b.id=${post_id} ", {user_id,post_id})
  }
   
///user/:user_id/comments
UserService.read4 = (user_id) => {
    return db.any("SELECT * FROM comments WHERE author=${user_id}", {user_id})
  }


//user/:user_id/comments/:comment_id
UserService.read5 = (user_id, comment_id) => {
    console.log("runs")
    return db.any("SELECT comments.title FROM comments users JOIN comments ON users.id=comments.author WHERE users.id=${user_id}  AND comments.author=${comment_id}  ", {user_id,comment_id})
}

//login
// /user/login
UserService.read=(id)=>{
    return db.one('SELECT * FROM users WHERE id=${id}',{id})
}
//-----ignore
// *****i do not need this 
// UserService.update = (id,username,email) => {
//     console.log(id,username, email)
//   return db.none("UPDATE users SET username=${username}, email=${email} WHERE id=${id}", {id,username,email})
// }
//*** */redid up above 
// UserService.delete = (id) => {
//   return db.none("DELETE FROM users WHERE id=${id};",{id})
// }
//------------

//***************** Tokens
UserService.insertToken = (token, username) => db.none(
  'UPDATE users SET token = ${token} WHERE username = ${username}', {token, username,}
);

UserService.checkForToken = (request, response, next) => {
  if (!(request.headers.token)) {
      response.json({
          'Response': `You must log in.`
      });
  }
  next();
}


module.exports = UserService;