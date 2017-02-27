const polAXIOS = require('./pol-axios');
const axios = require('axios');
const models = require('../../../db/models/index.js');

// polaxios requests

function getSenIntroduced() {
  return polAXIOS.get('senate/bills/introduced.json')
}

function getSenPassed() {
  return polAXIOS.get('senate/bills/passed.json')
}

function getHouseIntroduced() {
  return polAXIOS.get('house/bills/introduced.json')
}

function getHousePassed() {
  return polAXIOS.get('house/bills/passed.json')
}

// aggretating the requests

function getSenate() {
  axios.all([getSenIntroduced(), getSenPassed()])
    .then(axois.spread((senIntroduced, senPassed) => {
      return [senIntroduced, senPassed];
    }))
    .catch((err) => {return err;});
}

function getHouse() {
  axios.all([getHouseIntroduced(), getHousePassed()])
    .then(axois.spread((houseIntroduced, housePassed) => {
      return [houseIntroduced, housePassed];
    }))
    .catch((err) => {return err;});
}

// the actual middleware

function getBills(req, res, next) {
  axios.all([getSenate(), getHouse()])
    .then(axios.spread((senRes, houseRes) => {
      console.log(houseRes);
      console.log(senRes);
    }))
    .catch((err) => console.log(err));
}


module.exports = {
  getBills
}