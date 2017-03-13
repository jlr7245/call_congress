const axios = require('axios');

/*

this file will run every couple of hours and perform a number of tasks





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