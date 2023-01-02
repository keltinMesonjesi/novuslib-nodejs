/*
|--------------------------------------------------------------------------
| Utility for handling file operations
|--------------------------------------------------------------------------
*/

const { debug } = require('../../config/app');
const path = require('path');
const fs = require('fs');
const without = require('lodash/without');
const { logging } = require('../../config/logging');
const httpStatus = require('http-status');
const ApiException = require('../Exceptions/ApiException');
const BASE_PATH = path.join(__dirname, '../../');
const EXCLUDED_FILES = ['index.js'];

/**
 * Get an array of file names located inside a folder
 * @param directory
 * @return Array
 */
const getFilesFromFolder = (directory) => {
  let filesList = [];

  try {
    filesList = fs.readdirSync(path.join(BASE_PATH, directory));
  } catch (err) {
    if (debug === 'true') {
      logging.error('Unable to load files from directory: ' + err);
      throw new ApiException(httpStatus.INTERNAL_SERVER_ERROR, 'Unable to load files from directory: ' + err);
    } else {
      throw new ApiException(httpStatus.INTERNAL_SERVER_ERROR, 'An error has occurred');
    }
  }

  return without(filesList, ...EXCLUDED_FILES);
};

module.exports = {
  getFilesFromFolder,
};
