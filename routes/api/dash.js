const express = require('express');
const dashRouter = express.Router();

const authHelpers = require('./auth/auth-helpers');
const dashHelpers = require('./pol/dashHelper');
const dbHelpers = require('./user-updates/dbHelper');

dashRouter.get('/:id', authHelpers.loginRequired, dashHelpers.getLegsFromDb, dashHelpers.getLegsFromJson, (req, res, next) => {
  console.log('hi');
  res.status(200).send({legislators: res.locals.legislators, message: 'yay it arrived'});
});

dashRouter.patch('/leg/:id', dbHelpers.addLegToDb, (req, res, next) => {
  res.status(200).send({message: 'Legislator added successfully.'})
})

module.exports = dashRouter;