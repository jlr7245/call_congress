const express = require('express');
const extRouter = express.Router();

const districtHelpers = require('./geo/districtHelpers');
const modalHelpers = require('./pol/modalHelper');

extRouter.post('/geo', districtHelpers.coord2pol, (req, res, next) => {
  // res.send({st: res.locals.stateAbb, dst: res.locals.distNum})
  res.send({resultArray: res.locals.districtArr});
});

extRouter.get('/mod/leg/:id', modalHelpers.getVotesAndDetails, (req, res, next) => {
  res.status(200).send({message: 'ok'});
});

module.exports = extRouter;