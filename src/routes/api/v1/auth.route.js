const express = require('express');
const { validate } = require('../../../app/Providers/validation.provider');
const registerRequest = require('../../../app/Http/Requests/Auth/register.request');
const { register } = require('../../../app/Http/Controllers/Auth/register.controller');

const { UserDetail } = require('../../../app/Models');
const { User } = require('../../../app/Models');

const router = express.Router();
router.get('/', async (req, res) => {
  const userDetail = await UserDetail.findOne({
    where: { id: 2 },
    include: User,
  });

  res.send(userDetail);
});
router.post('/register', [validate(registerRequest)], register);

module.exports = router;
