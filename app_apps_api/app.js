const express = require('express');
const config = require('config');
const cors = require('cors');

const {appsRouter} = require('./routes/index');

const app = express();


app.use(express.json());
app.use(cors());

app.use('/v1/', appsRouter);

module.exports = app;
