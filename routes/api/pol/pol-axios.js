const axios = require('axios');
require('dotenv').config();

const polAXIOS = axios.create({
  baseURL: 'https://api.propublica.org/congress/v1/',
  headers: {
    'X-API-Key': process.env.PROPUBLICA_KEY
  }
});

module.exports = polAXIOS;