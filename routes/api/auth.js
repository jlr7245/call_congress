const express = require('express');
const authRouter = express.Router();

authRouter.post('/login', (req, res, next) => {
  res.send({hello: "world"});
})

authRouter.post('/register', (req, res, next) => {

})




module.exports = authRouter;