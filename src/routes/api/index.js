/**
 * Configure routes called from API
 */
const express = require('express');
const router = express.Router();
const config = require('../../config/app');
const apiRoutes = require('./' + config.apiVersion);

router.use(`/${config.apiVersion}`, apiRoutes);

module.exports = router;
