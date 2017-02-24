const axios = require('axios');
const polAXIOS = require('./pol-axios');

function getReps(st, dst) {
  return polAXIOS.get(`/house/${st}/${dst}`);
}

function getSens(st) {
  return polAXIOS.get(`/senate/${st}`)
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
      console.log(sens.data);
      console.log(reps.data);
      return next();
    })).catch((err) => console.log(err));
}

module.exports = {
  getLegsOnReg,
  getLatLngFromAddr,
}