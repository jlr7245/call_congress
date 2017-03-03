const express = require('express');
const extRouter = express.Router();

const districtHelpers = require('./geo/districtHelpers');
const modalHelpers = require('./pol/modalHelper');
const lawHelpers = require('./pol/lawHelpers');

extRouter.post('/geo', districtHelpers.coord2pol, (req, res, next) => {
  // res.send({st: res.locals.stateAbb, dst: res.locals.distNum})
  res.send({resultArray: res.locals.districtArr}); // maybe i'm thinking too hard
  // about getting this to work when i'm going to have to do something totally
  // different with finding districts anyway
});

extRouter.get('/bills', lawHelpers.getHouse, lawHelpers.getSenate, lawHelpers.manipulateBills, (req, res, next) => {
  console.log('sending');
  res.send({
    message: 'ok',
    houseInfo: res.locals.houseInfo,
    senateInfo: res.locals.senateInfo
  })
})

extRouter.get('/mod/leg/:id', modalHelpers.getVotesAndDetails, (req, res, next) => {
  res.status(200).send({
    message: 'ok', 
    modalInfo: res.locals.modalInfo
  });
});

module.exports = extRouter;