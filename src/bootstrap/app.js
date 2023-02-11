/*
|--------------------------------------------------------------------------
| Create The Application
|--------------------------------------------------------------------------
|
| The first thing we will do is create a new Express application instance
| which serves as the "glue" for all the components and is
| the IoC container for the system binding all the various parts.
|
*/
const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const httpStatus = require('http-status');
const appConfig = require('../config/app');
const { connectToDb } = require('../config/database');
const { auth, jwtStrategy } = require('../config/auth');
const logging = require('../config/logging');
const { errorConverter, errorHandler } = require('../app/Exceptions/Handler');
const ApiException = require('../app/Exceptions/ApiException');
const routes = require('../routes');

const app = express();

// http logger
if (appConfig.debug === 'true') {
  app.use(logging.successHandler);
  app.use(logging.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// init authentication package
app.use(auth.initialize());
auth.use('jwt', jwtStrategy);

// routes
app.use('/', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiException(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiException, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

// initialize app
const init = () => {
  app.listen(appConfig.port, async () => {
    logging.logging.info(`App running on http://localhost:${appConfig.port}`); // log app running host info
    await connectToDb(); // attempt DB connection
  });
};

module.exports = { app, init };
