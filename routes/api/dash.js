const express = require('express');
const dashRouter = express.Router();

const authHelpers = require('./auth/auth-helpers');
const dashHelpers = require('./pol/dashHelper');

dashRouter.get('/:id', authHelpers.loginRequired, dashHelpers.getLegsFromDb, dashHelpers.getLegsFromJson, (req, res, next) => {
  console.log('hi');
  res.status(200).send({legislators: res.locals.legislators, message: 'yay it arrived'});
});

module.exports = dashRouter;