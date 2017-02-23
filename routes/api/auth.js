const express = require('express');
const authRouter = express.Router();

const authHelpers = require('./auth-helpers');
const passport = require('./local');

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

authRouter.post('/register', (req, res, next) => {
  authHelpers.createUser(req, res)
    .then((user) => {
      req.login(user, (err) => {
        if (err) return next(err);

        res.send({auth: true, user: user});
      });
    }).catch((err) => {console.log(err);});
});

authRouter.post('/logout', (req, res) => {
  req.logout();
  res.send({auth: false});
})


module.exports = authRouter;