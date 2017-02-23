const axios = require('axios');

const dstkAXIOS = axios.create({
  baseURL: 'http://www.datasciencetoolkit.org/coordinates2politics',
})

function coord2pol(req, res, next) {
  console.log(req.body.latlng);
  dstkAXIOS.get(`/${req.body.latlng}`)
    .then((result) => console.log(result.data[0].politics))
    .catch((err) => console.log(err));
  next();
}

module.exports = {
  coord2pol,
}