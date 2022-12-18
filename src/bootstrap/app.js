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
const appConfig = require("../config/app");

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(appConfig.port, () => {
  if (appConfig.env !== 'production') {
    console.log(`App running on http://localhost:${appConfig.port}`);
  }
});

module.exports = app;
