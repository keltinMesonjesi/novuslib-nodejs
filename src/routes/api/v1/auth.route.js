const express = require('express');
const { validate } = require('../../../app/Providers/validation.provider');
const registerRequest = require('../../../app/Http/Requests/Auth/register.request');

const router = express.Router();
router.get('/', (req, res, next) => res.send('This is an auth route'));
router.post('/', [validate(registerRequest)] ,(req, res, next) => res.send('This is an auth post route'));

module.exports = router;
