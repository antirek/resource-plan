/* eslint no-underscore-dangle: ["error", { "allow": ["id_"] }] */

const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const quasarServe = require('./quasar-serve');
const { Landing } = require('./models');

const db = mongoose.connect(config.mongodb, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const app = express();

app.use('/', quasarServe({
  distPath: './../client/dist/spa',
  replaces: {
    baseUrl: config.baseUrl,
  }
}));
app.use(express.json());
app.use(cors());

module.exports = app;
