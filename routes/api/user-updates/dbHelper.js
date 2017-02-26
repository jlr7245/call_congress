const models = require('../../../db/models/index.js');

function addLegToDb(req, res, next) {
  let leg = req.params.id;
  models.LegsWatched.create({
      belongs_to: req.user.id,
      bioguide_id: leg
    });
  return next();
}

module.exports = {
  addLegToDb,
}