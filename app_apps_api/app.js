const express = require('express');
const config = require('config');
const cors = require('cors');
const jsend = require('jsend');
const redis = require('async-redis');

const {createRouter} = require('./routes/index');

const app = express();
const redisClient = redis.createClient(config.redis);


app.use(express.json());
app.use(jsend.middleware);
app.use(cors());

app.use('/v1/', createRouter(redisClient));

module.exports = app;
