const bcrypt = require('bcryptjs');

const models = require('../../../db/models/index');

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function loginRedirect(req,res,next) {
  if (req.user) res.send({message: "you're already logged in!"});
  return next();
}

function createUser(req, res) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);

  return models.User.create({
    username: req.body.username,
    password: hash,
    name: req.body.name,
    email: req.body.email,
    state: req.body.state,
    district: req.body.district
  });
}

function loginRequired(req, res, next) {
  if (!req.user) res.send({auth: false, message: 'Please log in.'});
  return next();
}

module.exports = {
  comparePass,
  loginRedirect,
  loginRequired,
  createUser
}