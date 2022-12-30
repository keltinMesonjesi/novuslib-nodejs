/*
|--------------------------------------------------------------------------
| Base scaffolding for handling business logic in API controllers
|--------------------------------------------------------------------------
*/

const httpStatus = require('http-status');
const httpResponse = require('./httpResponse.utility');
const ApiException = require('../Exceptions/ApiException');

/**
 * Execute controller action logic inside try/catch structure
 * @param res
 * @param customResponseStatusCode
 * @param actionLogic
 * @returns {Promise<*>}
 */
const executeActionWithDml = async (res, customResponseStatusCode, actionLogic) => {
  try {
    const responseData = await actionLogic();
    return httpResponse(res, responseData, '', customResponseStatusCode);
  } catch (e) {
    if (e instanceof ApiException) {
      return httpResponse(res, {}, e.message, e.statusCode);
    } else {
      return httpResponse(res, {}, httpStatus[httpStatus.INTERNAL_SERVER_ERROR]);
    }
  }
};

module.exports = {
  executeActionWithDml,
};
