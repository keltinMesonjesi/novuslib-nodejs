/**
 * This file is used to load models
 */

const path = require('path');
const { dbConnection } = require('../../config/database');
const { models: modelsNames } = require('../../config/model');

/**
 * Load model from model folder
 * @param model String
 */
const loadModel = (model) => {
  return require(path.join(__dirname, '../Models', `${model}.Model`));
};

/**
 * Define models
 * @type {*[]}
 */
const modelDefiners = [];

for (const modelName of modelsNames) {
  modelDefiners.push(loadModel(modelName));
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
  ...dbConnection.models,
};
