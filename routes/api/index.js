const express = require('express');
const apiRouter = express.Router();

const authRoutes = require('./auth');
const dashRoutes = require('./dash');
const eventRoutes = require('./events');
const scriptRoutes = require('./script');
const extRoutes = require('./ext');

apiRouter.use('/auth', authRoutes);
apiRouter.use('/ext', extRoutes);
apiRouter.use('/dash', dashRoutes);
//apiRouter.use('/script', scriptRoutes);
//apiRouter.use('/event', eventRoutes);

module.exports = apiRouter;