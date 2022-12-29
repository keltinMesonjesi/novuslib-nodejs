/*
|--------------------------------------------------------------------------
| Exports models
|--------------------------------------------------------------------------
|
| Easy access to models
| Usage: const { ModelName } = require('path_to_app/Models');
|
*/

const { models } = require('../Providers/model.provider');

module.exports = {
  ...models,
};
