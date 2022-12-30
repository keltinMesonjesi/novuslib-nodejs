/**
 * Configure routes available only on dev environment
 */
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('This is a dev route'));

module.exports = router;
