const Joi = require('joi');
const pick = require('lodash/pick');
const replace = require('lodash/replace');
const isEmpty = require('lodash/isEmpty');
const httpStatus = require('http-status');
const ApiException = require('../Exceptions/ApiException');
const { requestKeys, requestTypeToKey } = require('../Utility/constants.utility');
const { dbConnection, QueryTypes } = require('../../config/database');

/**
 * Create Joi validation object
 * @param requestType
 * @param schema
 * @returns {{}}
 */
const createValidationObj = (requestType, schema) => {
  let finalObj = {};
  finalObj[requestTypeToKey[requestType]] = Joi.object().keys(schema);
  return finalObj;
};

/**
 * Validate Joi schema and handle validation errors
 * @param schema
 * @returns {(function(*, *, *): Promise<*>)|*}
 */
const validate = (schema) => async (req, res, next) => {
  try {
    const validSchema = pick(schema, Object.values(requestKeys));
    const object = pick(req, Object.keys(validSchema));

    const { value } = await Joi.compile(validSchema)
      .prefs({ errors: { label: 'key' }, abortEarly: false })
      .validateAsync(object);

    Object.assign(req, value);
  } catch (error) {
    if (!(error instanceof Joi.ValidationError)) {
      return next(error);
    } else {
      let errorMessage = {};
      error.details.forEach((detail) => {
        errorMessage[detail.context.key] = [replace(detail.message, /["]+/g, '')];
      });
      return next(new ApiException(httpStatus.BAD_REQUEST, errorMessage));
    }
  }

  return next();
};

/**
 * Check if value is unique in table
 * @param table
 * @param column
 * @returns {function(*): Promise<*>}
 */
const isUniqueInTable = (table, column) => {
  return async (value) => {
    const result = await dbConnection.query(`SELECT ${column} FROM ${table} WHERE ${column} = :value`, {
      replacements: {
        value,
      },
      type: QueryTypes.SELECT,
    });

    if (!isEmpty(result)) {
      throw new Joi.ValidationError(`${column} already taken`, [
        {
          context: {
            key: column,
          },
          message: `${column} already taken`,
        },
      ]);
    }

    return value;
  };
};

module.exports = {
  Joi,
  createValidationObj,
  validate,
  isUniqueInTable,
};
