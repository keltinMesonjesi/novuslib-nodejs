const { Joi, createValidationObj, isUniqueInTable } = require('../../../Providers/validation.provider');
const { requestTypes } = require('../../../Utility/constants.utility');

module.exports = createValidationObj(requestTypes.post, {
  username: Joi.string().min(6).max(50).required().external(isUniqueInTable('users', 'username')),
  email: Joi.string().max(50).required().email().external(isUniqueInTable('users', 'email')),
  password: Joi.string().min(8).max(50).required(),
  password_confirmation: Joi.string()
    .min(8)
    .max(50)
    .required()
    .equal(Joi.ref('password'))
    .messages({ 'any.only': '{{#label}} must match password' }),
  firstname: Joi.string().required().max(50),
  lastname: Joi.string().required().max(50),
  phone_number: Joi.string().required().max(40),
  address: Joi.string().required().max(255),
});
