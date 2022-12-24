const express = require('express');
const config = require('../config/app');
const web = require('./web');
const api = require('./api');
const dev = require('./dev');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/',
    route: web,
  },
  {
    path: '/api',
    route: api,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/dev',
    route: dev,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
