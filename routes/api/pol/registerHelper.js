const axios = require('axios');
const polAXIOS = require('./pol-axios');
const models = require('../../../db/models/index.js');

function getReps(st, dst) {
  return polAXIOS.get(`/members/house/${st.toLowerCase()}/${dst}/current.json`);
}

function getSens(st) {
  return polAXIOS.get(`/members/senate/${st.toLowerCase()}/current.json`)
}

function getLatLngFromAddr(req, res, next) {
  if (req.body.state !== undefined && req.body.district !== undefined) {
    res.locals.state = req.body.state;
    res.locals.district = req.body.district;
    return next();
  }
  /* logic for google goes here */
}

function getLegsOnReg(req, res, next) {
  axios.all([getReps(req.body.state, req.body.district), getSens(req.body.state)])
    .then(axios.spread((reps, sens) => {
      let arr = [];
      for (let sen of sens.data.results) {
        arr.push(sen.id);
      }
      for (let rep of reps.data.results) {
        arr.push(rep.id);
      }
      console.log(arr);
      res.locals.legArr = arr;
      return next();
    })).catch((err) => {
      console.log(err);
      return next(err);
    });
}

function putLegsInDatabase(req,res,next) {
  res.locals.legArr.forEach((leg) => {
    models.LegsWatched.create({
      belongs_to: res.locals.user.id,
      bioguide_id: leg
    });
  });
  return next();
}

module.exports = {
  getLegsOnReg,
  getLatLngFromAddr,
  putLegsInDatabase
}