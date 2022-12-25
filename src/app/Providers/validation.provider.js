const Joi = require('joi');
const pick = require('lodash/pick');
const replace = require('lodash/replace');
const httpStatus = require('http-status');
const ApiException = require('../Exceptions/ApiException');
const { requestKeys, requestTypeToKey } = require('../Utility/constants.utility');

const createValidationObj = (requestType, schema) => {
  let finalObj = {};
  finalObj[requestTypeToKey[requestType]] = Joi.object().keys(schema);
  return finalObj;
};

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, Object.values(requestKeys));
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    let errorMessage = {};
    error.details.forEach((detail) => {
      errorMessage[detail.context.key] = [replace(detail.message, /["]+/g, '')];
    });
    return next(new ApiException(httpStatus.BAD_REQUEST, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

module.exports = {
  Joi,
  createValidationObj,
  validate
};
