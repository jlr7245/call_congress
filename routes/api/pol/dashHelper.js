const axios = require('axios');
const models = require('../../../db/models/index.js');
const allLegs = require('./sunlight-array');

/**
 * get legislators from the database and store them in `res.locals`
 * 
 * @param {object} req - the request object
 * @param {object} res - the response object
 * @param {function} next - the express next function
 */
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

/**
 * get legislators from the large json object instead of from the API
 * 
 * @param {object} req - the request object
 * @param {object} res - the response object
 * @param {function} next - the express next function
 * @returns - next() => to go to the next middleware
 */
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
