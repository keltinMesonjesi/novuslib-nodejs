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
const { Sequelize, DataTypes, Model } = require('sequelize');
const { logging } = require('./logging');

// Load env variables from .env file
dotenv.config({ path: path.join(__dirname, '../.env') });

const envVars = process.env;

const connectionParams = {
  username: envVars.DB_USERNAME,
  password: envVars.DB_PASSWORD,
  database: envVars.DB_DATABASE,
  host: envVars.DB_HOST,
  port: envVars.DB_PORT,
  dialect: envVars.DB_CONNECTION,
  migrationStorageTableName: 'sequelize_meta',
  seederStorageTableName: 'sequelize_data',
};

// New DB connection
const dbConnection = new Sequelize(connectionParams.database, connectionParams.username, connectionParams.password, {
  host: connectionParams.host,
  port: connectionParams.port,
  dialect: connectionParams.dialect,
  logging: envVars.APP_DEBUG === 'true' ? (msg) => logging.debug(msg) : false,
});

// Attempt DB connection
const connectToDb = async () => {
  try {
    await dbConnection.authenticate();
    logging.info('DB connection has been established successfully.');
  } catch (error) {
    logging.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

module.exports = {
  development: {
    ...connectionParams,
  },
  dbConnection,
  connectToDb,
  DataTypes,
  Model,
};
