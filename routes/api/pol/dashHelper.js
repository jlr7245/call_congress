const axios = require('axios');
const models = require('../../../db/models/index.js');
const allLegs = require('./sunlight-array');

function getLegsFromDb(req,res,next) {
  models.sequelize.query('SELECT "LegsWatcheds"."bioguide_id" FROM "LegsWatcheds" JOIN "Users" ON "Users"."id" = "LegsWatcheds"."belongs_to" WHERE "Users"."id" = :id', {
    replacements: { id: parseInt(req.params.id) },
    type: models.sequelize.QueryTypes.SELECT
  }).then((legs) => {
    let legArr = legs.map((leg) => {
      return leg.bioguide_id;
    });
    res.locals.legArr = legArr;
    return next();
  }).catch((err) => {
    console.log(err);
    return next(err);
  });
}

function getLegsFromJson(req,res,next) {
  const searchFor = res.locals.legArr;
  const filteredLegs = allLegs.filter((leg) => {
    return (searchFor.indexOf(leg.bioguide_id) !== -1)
  });
  res.locals.legislators = filteredLegs;
  return next();
}

module.exports = {
  getLegsFromDb,
  getLegsFromJson
}
