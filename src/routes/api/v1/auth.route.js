const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => res.send('This is an auth route'));

module.exports = router;
