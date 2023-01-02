/*
|--------------------------------------------------------------------------
| Base scaffolding for handling business logic in API controllers
|--------------------------------------------------------------------------
*/

const httpStatus = require('http-status');
const { dbConnection } = require('../../config/database');
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
  let dbTransaction = await dbConnection.transaction();

  try {
    const responseData = await actionLogic(dbTransaction);
    await dbTransaction.commit();
    return httpResponse(res, responseData, '', customResponseStatusCode);
  } catch (e) {
    if (e instanceof ApiException) {
      await dbTransaction.rollback();
      return httpResponse(res, {}, e.message, e.statusCode);
    } else {
      await dbTransaction.rollback();
      return httpResponse(res, {}, 'An error has occurred');
    }
  }
};

module.exports = {
  executeActionWithDml,
};
