/*
|--------------------------------------------------------------------------
| Default Database Connection Name
|--------------------------------------------------------------------------
|
| Here you may specify which of the database connections below you wish
| to use as your default connection for all database work. Of course
| you may use many connections at once using the Database library.
|
*/
const dotenv = require('dotenv');
const path = require('path');
const { Sequelize } = require('sequelize');
const { logging } = require('./logging');

// Load env variables from .env file
dotenv.config({ path: path.join(__dirname, '../.env') });

const envVars = process.env;

// New DB connection
const dbConnection = new Sequelize(
  envVars.DB_CONNECTION,
  envVars.DB_USERNAME,
  envVars.DB_PASSWORD,
  {
  host: envVars.DB_HOST,
  dialect: envVars.DB_CONNECTION
  }
);

// Attempt DB connection
const connectToDb = async () => {
  try {
    await dbConnection.authenticate();
    logging.info('DB connection has been established successfully.');
  } catch (error) {
    logging.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

module.exports = {
  dbConnection,
  connectToDb
};
