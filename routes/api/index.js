const express = require('express');
const apiRouter = express.Router();

const authRoutes = require('./auth');
const dashRoutes = require('./dash');
const eventRoutes = require('./events');
const scriptRoutes = require('./script');

apiRouter.use('/auth', authRoutes);


module.exports = apiRouter;