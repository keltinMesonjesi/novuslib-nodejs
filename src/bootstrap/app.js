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
const httpStatus = require('http-status');
const appConfig = require('../config/app');
const logging = require('../config/logging');
const { errorConverter, errorHandler } = require('../app/Exceptions/Handler');
const ApiError = require('../app/Utility/ApiError');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(appConfig.port, () => {
  if (appConfig.env !== 'production') {
    logging.info(`App running on http://localhost:${appConfig.port}`);
  }
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
