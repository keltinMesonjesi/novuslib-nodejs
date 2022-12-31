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
const { envVars } = require('./app');
const { Sequelize, DataTypes, Model, QueryTypes } = require('sequelize');
const { logging } = require('./logging');

/**
 * Define connection parameters
 * @type {{password: string, database: string, dialect: string, port: string, host: string, seederStorageTableName: string, migrationStorageTableName: string, username: string}}
 */
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

/**
 * Instantiate new DB connection
 * @type {Sequelize}
 */
const dbConnection = new Sequelize(connectionParams.database, connectionParams.username, connectionParams.password, {
  host: connectionParams.host,
  port: connectionParams.port,
  dialect: connectionParams.dialect,
  logging: envVars.APP_DEBUG === 'true' ? (msg) => logging.debug(msg) : false,
});

/**
 * Attempt DB connection
 * @returns {Promise<void>}
 */
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
  models: {
    ...dbConnection.models,
  },
  connectToDb,
  DataTypes,
  Model,
  QueryTypes,
};
