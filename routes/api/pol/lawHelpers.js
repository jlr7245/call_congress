const polAXIOS = require('./pol-axios');
const axios = require('axios');
const models = require('../../../db/models/index.js');
const moment = require('moment');

// polaxios requests

function getSenIntroduced() {
  return polAXIOS.get('115/senate/bills/introduced.json')
}

function getSenPassed() {
  return polAXIOS.get('115/senate/bills/passed.json')
}

function getHouseIntroduced() {
  return polAXIOS.get('115/house/bills/introduced.json')
}

function getHousePassed() {
  return polAXIOS.get('115/house/bills/passed.json')
}

// aggretating the requests

// this could be neater, probably

function getSenate(req,res,next) {
  axios.all([getSenIntroduced(), getSenPassed()])
    .then(axios.spread((senIntroduced, senPassed) => {
      console.log('got senate');
      let senIntro = senIntroduced.data.results[0].bills;
      senIntro.forEach((law) => {
        law.status_tag_cc = 'introduced';
      })
      let senPass = senPassed.data.results[0].bills;
      senPass.forEach((law) => {
        law.status_tag_cc = 'passed';
      })
      const senResults = [senIntro, senPass];
      res.locals.senateTemp = senResults;
      return next();
    }))
    .catch((err) => {
      console.log(err);
      return next(err);
    });
}

function getHouse(req,res,next) {
  axios.all([getHouseIntroduced(), getHousePassed()])
    .then(axios.spread((houseIntroduced, housePassed) => {
      console.log('got house');
      const houseIntro = houseIntroduced.data.results[0].bills;
      houseIntro.forEach((law) => {
        law.status_tag_cc = 'introduced';
      })
      const housePass = housePassed.data.results[0].bills;
      housePass.forEach((law) => {
        law.status_tag_cc = 'passed';
      }) 
      res.locals.houseTemp = [houseIntro, housePass];
      return next();
    }))
    .catch((err) => {
      console.log(err);
      return next(err);
    });
}

// the actual middleware

function createSortedLawSet(arr) {
  console.log('sorting');
  let newLawSet = [];
  for (let lawSet of arr) {
    lawSet.forEach((law) => {
      law.lookup_cc = law.number.split(/[\s\.]{1}/g).join('').toLowerCase();
      newLawSet.push(law);
    })
  }
  newLawSet.sort((a, b) => {
    let timeA = manipulateTime(a);
    let timeB = manipulateTime(b);
    return timeB - timeA;
  });
  return newLawSet;
}

function manipulateTime(obj) {
  let time = new Date(obj.latest_major_action_date).getTime();
  return time;
}

function manipulateBills(req, res, next) {
  console.log('manipulating');
  res.locals.senateInfo = createSortedLawSet(res.locals.senateTemp);
  res.locals.houseInfo = createSortedLawSet(res.locals.houseTemp);
  return next();
}


module.exports = {
  getHouse,
  getSenate,
  manipulateBills
}