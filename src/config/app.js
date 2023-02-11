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
const { generateAppKey } = require('../app/Providers/app.provider');

// Load env variables from .env file
dotenv.config({ path: path.join(__dirname, '../.env') });

let envVars = process.env;

// Generate app key if not present
if (envVars.APP_KEY === '') {
  const appKey = generateAppKey();
  process.env.APP_KEY = appKey;
  envVars.APP_KEY = appKey;
}

module.exports = {
  envVars,
  name: envVars.APP_NAME,
  env: envVars.APP_ENV,
  key: envVars.APP_KEY,
  debug: envVars.APP_DEBUG,
  port: envVars.APP_PORT,
  url: envVars.APP_URL,
  apiVersion: envVars.API_VERSION,
};
