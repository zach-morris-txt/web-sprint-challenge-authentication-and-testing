//Imports
const { findBy } = require('../auth/users-model')


//Middleware
    //Missing Inputs
const requireUsernamePassword = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(422).json({
        message: 'username and password required',
      });
  } else {
    next()
  }
}
    //Unique Username
async function checkUsernameTaken(req, res, next) {
  try {
    const users = await findBy( {username: req.body.username })
    if(!users.length) {
      next()
    } else {
      next({
        status: 422,
        message: "username taken"
      })    
    }
  } catch (err) {
    next(err)
  }
}
    //Exists Username & Password
const checkUsernamePasswordExist = async (req, res, next) => {
  try {
    const [user] = await findBy({ username: req.body.username })
    if(!user || !user.password) {
      next({
        status: 401,
        message: 'invalid credentials'
      })
    } else {
      req.user = user
      next()
    }
  } catch (err) {
    next(err)
  }
}


//Exports; Exposing
module.exports = {
    requireUsernamePassword,
    checkUsernameTaken,
    checkUsernamePasswordExist,
}