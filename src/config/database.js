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
const { Sequelize, DataTypes, Model, QueryTypes } = require('sequelize');
const { logging } = require('./logging');

/**
 * Load env variables from .env file
 */
dotenv.config({ path: path.join(__dirname, '../.env') });

/**
 * Define environment variables in single variable
 * @type {{readonly APP_ENV?: string, readonly MAIL_ENCRYPTION?: string, readonly PUSHER_PORT?: string, readonly PUSHER_APP_CLUSTER?: string, readonly DB_PORT?: string, readonly MAIL_HOST?: string, readonly AWS_SECRET_ACCESS_KEY?: string, readonly PUSHER_APP_KEY?: string, readonly APP_NAME?: string, readonly SESSION_LIFETIME?: string, readonly AWS_DEFAULT_REGION?: string, readonly AWS_BUCKET?: string, readonly APP_KEY?: string, readonly AWS_USE_PATH_STYLE_ENDPOINT?: string, readonly SESSION_DRIVER?: string, readonly DB_USERNAME?: string, readonly QUEUE_CONNECTION?: string, readonly REDIS_PORT?: string, readonly AWS_ACCESS_KEY_ID?: string, readonly MAIL_FROM_NAME?: string, readonly PUSHER_HOST?: string, readonly LOG_DEPRECATIONS_CHANNEL?: string, readonly DB_CONNECTION?: string, readonly REDIS_PASSWORD?: string, readonly L5_SWAGGER_CONST_HOST?: string, readonly APP_URL?: string, readonly LOG_LEVEL?: string, readonly APP_DEBUG?: string, readonly REDIS_HOST?: string, readonly FILESYSTEM_DISK?: string, readonly MAIL_USERNAME?: string, readonly PUSHER_APP_SECRET?: string, readonly PUSHER_APP_ID?: string, readonly API_VERSION?: string, readonly DB_HOST?: string, readonly PUSHER_SCHEME?: string, readonly MAIL_PORT?: string, readonly MEMCACHED_HOST?: string, readonly MAIL_FROM_ADDRESS?: string, readonly LOG_CHANNEL?: string, readonly MAIL_MAILER?: string, readonly APP_PORT?: string, readonly BROADCAST_DRIVER?: string, readonly CACHE_DRIVER?: string, readonly DB_DATABASE?: string, readonly MAIL_PASSWORD?: string, readonly DB_PASSWORD?: string, readonly PROCESSOR_IDENTIFIER?: string, readonly CommonProgramFiles?: string, readonly APPDATA?: string, readonly "=::"?: string, readonly FPS_BROWSER_USER_PROFILE_STRING?: string, readonly RlsSvcPort?: string, readonly LOCALAPPDATA?: string, readonly ProgramData?: string, readonly COMPUTERNAME?: string, readonly "CommonProgramFiles(x86)"?: string, readonly SystemDrive?: string, readonly USERDOMAIN?: string, readonly OneDriveConsumer?: string, readonly OneDrive?: string, readonly TMP?: string, readonly SystemRoot?: string, readonly HOMEPATH?: string, readonly TEMP?: string, readonly windir?: string, readonly LOGONSERVER?: string, readonly SESSIONNAME?: string, readonly ProgramFiles?: string, readonly HOMEDRIVE?: string, readonly DriverData?: string, readonly PUBLIC?: string, readonly USERDOMAIN_ROAMINGPROFILE?: string, readonly Path?: string, readonly ACSvcPort?: string, readonly PROCESSOR_LEVEL?: string, readonly FPS_BROWSER_APP_PROFILE_STRING?: string, readonly ComSpec?: string, readonly NUMBER_OF_PROCESSORS?: string, readonly IDEA_INITIAL_DIRECTORY?: string, readonly PROCESSOR_ARCHITECTURE?: string, readonly PROCESSOR_REVISION?: string, readonly OS?: string, readonly USERPROFILE?: string, readonly ALLUSERSPROFILE?: string, readonly USERNAME?: string, readonly ProgramW6432?: string, readonly CommonProgramW6432?: string, readonly "ProgramFiles(x86)"?: string, readonly PSModulePath?: string, readonly PATHEXT?: string, [p: string]: string}}
 */
const envVars = process.env;

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
