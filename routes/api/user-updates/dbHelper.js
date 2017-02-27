const models = require('../../../db/models/index.js');

function doNothing(req,res,next) {
  console.log(req.params.id);
  console.log(req.user.id);
  return next();
}

function addLegToDb(req, res, next) {
  console.log(req.params.id);
  let leg = req.params.id;
  models.LegsWatched.create({
      belongs_to: req.user.id,
      bioguide_id: leg
    });
  return next();
}

module.exports = {
  addLegToDb,
  doNothing
}