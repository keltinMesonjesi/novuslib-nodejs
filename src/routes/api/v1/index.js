const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.route');
const docsRoutes = require('./docs.route');

router.use('/auth', authRoutes);
router.use('/docs', docsRoutes);

module.exports = router;
