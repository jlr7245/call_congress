const express = require('express');
const extRouter = express.Router();

const districtHelpers = require('./geo/districtHelpers');

extRouter.post('/geo', districtHelpers.coord2pol, (req, res, next) => {
  // res.send({st: res.locals.stateAbb, dst: res.locals.distNum})
  res.send({resultArray: res.locals.districtArr});
})

module.exports = extRouter;