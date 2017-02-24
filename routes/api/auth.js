const express = require('express');
const authRouter = express.Router();

const authHelpers = require('./auth/auth-helpers');
const passport = require('./auth/local');
const regHelp = require('./pol/registerHelper');

authRouter.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { 
      console.log(err);
      return res.send({auth: false, message: 'Sorry, didnt work'});
    }
    if (!user) {
      return res.send({auth: false, message: 'No valid user found'});
    }
    return res.send({auth: true, user: user});
  })(req, res, next);
})

authRouter.post('/register', regHelp.getLatLngFromAddr, authHelpers.createUser, regHelp.getLegsOnReg, regHelp.putLegsInDatabase, (req, res, next) => {
  res.send({
    user: {
      name: res.locals.user.name,
      id: res.locals.user.id,
      state: res.locals.user.state,
      district: res.locals.user.district,
      username: res.locals.user.username
    }, 
    auth: true 
  })
});

authRouter.post('/logout', (req, res) => {
  req.logout();
  res.send({auth: false});
})


module.exports = authRouter;