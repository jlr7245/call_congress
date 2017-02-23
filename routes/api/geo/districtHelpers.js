const axios = require('axios');

const dstkAXIOS = axios.create({
  baseURL: 'http://www.datasciencetoolkit.org/coordinates2politics',
})


function extractDistrict(arr) {
  let holder = [];
  let theResult = [];
  for (let obj of arr) {
    if (obj.type === 'constituency' && holder.indexOf(obj.code) == -1) {
      holder.push(obj.code);
      theResult.push([parseInt(obj.code.split('_')[1]), obj.name.split(', ')[1]] );
    }
  }
  return theResult;
}

function coord2pol(req, res, next) {
  console.log(req.body.latlng);
  dstkAXIOS.get(`/${req.body.latlng}`)
    .then((result) => {
      res.locals.districtArr = extractDistrict(result.data[0].politics);
    })
    .catch((err) => console.log(err));
  next();
}

module.exports = {
  coord2pol,
}