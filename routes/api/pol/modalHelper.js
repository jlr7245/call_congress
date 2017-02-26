const axios = require('axios');
const polAXIOS = require('./pol-axios');

// object manipulation
function organizeLegResult(legObj) {
  let resLeg = legObj.results[0];
  let prevCommittees = resLeg.roles.filter((role) => {
    return (role.committees.length !== undefined && role.committees.length > 0);
  }).map((role) => {
    return role.committees.map((com) => {
      return ({
        name: com.name,
        congress: role.congress
      });
    })[0];
  });
  let resObj = {
    bills_sponsored: resLeg.roles[0].bills_sponsored,
    bills_cosponsored: resLeg.roles[0].bills_sponsored,
    votes_missed: resLeg.roles[0].missed_votes_pct,
    party_line: resLeg.roles[0].votes_with_party_pct,
    first_term: resLeg.roles[resLeg.roles.length - 1].start_date,
    num_terms: resLeg.roles.length,
    current_committes: resLeg.roles[0].committees,
    previous_committees: prevCommittees,
  };
  return resObj;
}

function addBills(billRes, legCB) {
  let bills = billRes.results[0].votes.slice(0, 25);
  let theVotes = bills.map((vote) => {
    if (Object.getOwnPropertyNames(vote.bill).length > 0) {
      return ({
        number: vote.bill.number,
        lookup: vote.bill.number.split(/[\s\.]{1}/g).join('').toLowerCase(), 
                                      // frustratingly, these aren't normalized between
                                      // house & senate and also vary between senate, but
                                      // writing the regex was a fun exercise
        description: vote.description,
        latest_action: vote.bill.latest_action,
        when: `${vote.date}T${vote.time}-05:00`,
        question: vote.question,
        position: vote.position,
      })
    } else {
      return ({
        description: vote.description,
        when: `${vote.date}T${vote.time}-05:00`,
        question: vote.question,
        position: vote.position,
      })
    }
  });
  legCB.recent_votes = theVotes;
  return legCB;
}

// axios calls

function getLegislatorDetails(id) {
  return polAXIOS.get(`/members/${id}.json`);
}

function getBillDetails(id) {
  return polAXIOS.get(`/members/${id}/votes.json`);
}


// middleware
function getVotesAndDetails(req, res, next) {
  axios.all([getLegislatorDetails(req.params.id), getBillDetails(req.params.id)])
    .then(axios.spread((legObj, billRes) => {
      res.locals.modalInfo = addBills(billRes.data, organizeLegResult(legObj.data));
      return next();
    })).catch((err) => {
      console.log(err);
      return next(err);
    })
}

module.exports = {
  getVotesAndDetails,
}