/*
|--------------------------------------------------------------------------
| Application General Configurations
|--------------------------------------------------------------------------
|
| Here you will find the basic configurations for your app
|
*/
const dotenv = require('dotenv');
const path = require('path');

// Load env variables from .env file
dotenv.config({ path: path.join(__dirname, '../.env') });

const envVars = process.env;

module.exports = {
  name: envVars.APP_NAME,
  env: envVars.APP_ENV,
  key: envVars.APP_KEY,
  debug: envVars.APP_DEBUG,
  port: envVars.APP_PORT,
  url: envVars.APP_URL,
  apiVersion: envVars.API_VERSION
};
