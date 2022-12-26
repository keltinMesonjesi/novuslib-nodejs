const express = require('express');
const { validate } = require('../../../app/Providers/validation.provider');
const registerRequest = require('../../../app/Http/Requests/Auth/register.request');
const { register } = require('../../../app/Http/Controllers/Auth/register.controller');

const router = express.Router();
router.get('/', (req, res, next) => res.send('This is an auth route'));
router.post('/', [validate(registerRequest)], register);

module.exports = router;
