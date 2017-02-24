const axios = require('axios');
require('dotenv').config();

const polAXIOS = axios.create({
  baseURL: 'https://api.propublica.org/congress/v1/115',
  headers: {
    'X-API-KEY': process.env.PROPUBLICA_KEY
  },
})

module.exports = polAXIOS;