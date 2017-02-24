const axios = require('axios');
const polAXIOS = require('./pol-axios');

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
        console.log(sen);
        arr.push(sen.id);
      }
      for (let rep of reps.data.results) {
        console.log(rep);
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

module.exports = {
  getLegsOnReg,
  getLatLngFromAddr,
}