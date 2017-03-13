const axios = require('axios');
// polAXIOS
// model for bills tables

/*

this file will run every couple of hours and perform a number of tasks

1. take a representative sample from the database
2. compare that sample to an API call that should return similar data
3. if the data is different it will run a couple of different functions to refresh the database's information
4. if the data is the same it does nothing

*/



// testing out the basic concept
function tester() {
  console.log('hello world');
  axios.get('http://localhost:3000/test')
    .then((result) => {
      console.log(result.data);
    })
}
tester();
// `npm run scrape` outputs hello world and the result from that API call 💪