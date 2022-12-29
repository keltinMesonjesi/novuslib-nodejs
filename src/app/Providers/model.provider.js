/*
|--------------------------------------------------------------------------
| Provides model services
|--------------------------------------------------------------------------
|
| Here you will find basic model functionality provided to the app
|
*/

const path = require('path');
const { dbConnection } = require('../../config/database');
const { getFilesFromFolder } = require('../Utility/files.utility');

/**
 * Require model file
 * @param model String
 */
const requireModel = (model) => {
  return require(path.join(__dirname, '../Models', model));
};

/**
 * Autoload model names
 */
const modelsNames = getFilesFromFolder('app/Models');

/**
 * Define models
 * @type {*[]}
 */
let modelDefiners = [];

for (const modelName of modelsNames) {
  modelDefiners.push(requireModel(modelName));
}

/**
 * Loading all models
 */
for (const modelDefiner of modelDefiners) {
  modelDefiner.loadModel(dbConnection);
}

/**
 * Load associations (need to be loaded after all models have been loaded)
 */
for (const modelDefiner of modelDefiners) {
  modelDefiner.loadAssociations(dbConnection.models);
}

module.exports = {
  models: dbConnection.models,
};
