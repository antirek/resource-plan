/* eslint no-underscore-dangle: ["error", { "allow": ["id_"] }] */

const express = require('express');
const config = require('config');
const cors = require('cors');

const quasarServe = require('./quasar-serve');

const {
  appsRouter,
  accountsRouter,
  resourcesRouter,
} = require('./routes/');

const app = express();

app.use('/', quasarServe({
  distPath: './../client/dist/spa',
  replaces: {
    baseUrl: config.baseUrl,
  }
}));

app.use(express.json());
app.use(cors());

app.use('/apps/', appsRouter);
app.use('/accounts/', accountsRouter);
app.use('/resources/', resourcesRouter);

module.exports = app;
