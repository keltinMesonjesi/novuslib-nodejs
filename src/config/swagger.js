/*
|--------------------------------------------------------------------------
| Configurations for swagger OpenAPI documentation
|--------------------------------------------------------------------------
*/

const swaggerUi = require('swagger-ui-express');
const path = require('path');

const { apiVersion: apiVersionDefault } = require('./app');

/**
 * Default folder path to swagger documentation
 * @type {string}
 */
const swaggerDocFolderPath = path.join(__dirname, '../storage/api-docs');

/**
 * Default name for swagger document
 * @type {string}
 */
const DOC_NAME_DEFAULT = 'api-docs';

/**
 * Load swagger document
 * @param apiVersion
 * @param docName
 * @return {*}
 */
const loadSwaggerDocument = (apiVersion = apiVersionDefault, docName = DOC_NAME_DEFAULT) =>
  require(`${swaggerDocFolderPath}/${apiVersion}/${docName}.json`);

module.exports = {
  swaggerUi,
  loadSwaggerDocument,
};
