/*
|--------------------------------------------------------------------------
| Generate http response json for API requests
|--------------------------------------------------------------------------
*/

const httpStatus = require('http-status');
const isEmpty = require('lodash/isEmpty');
const includes = require('lodash/includes');
const assign = require('lodash/assign');

const SUCCESS = 'success';

const FAILED = 'failed';

const SUCCESS_STATUSES = [httpStatus.OK, httpStatus.CREATED, httpStatus.NO_CONTENT];

/**
 * Generate JSON response
 * @param res Express response
 * @param data Main data response body
 * @param message Message in case of error
 * @param responseStatusCodeAlt Manually provided resp code (default: 200(success) or 500(error))
 * @returns {*}
 */
module.exports = (res, data = {}, message = '', responseStatusCodeAlt = null) => {
  let responseStatusCode =
    responseStatusCodeAlt !== null
      ? responseStatusCodeAlt
      : isEmpty(message)
      ? httpStatus.OK
      : httpStatus.INTERNAL_SERVER_ERROR;
  let status = isEmpty(message) ? SUCCESS : FAILED;

  return res.status(responseStatusCode).send(
    assign(
      {
        status: status,
      },
      includes(SUCCESS_STATUSES, responseStatusCode) ? { data } : { message }
    )
  );
};
