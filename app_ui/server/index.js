#! /usr/bin/env node

const app = require('./app');
const config = require('config');

app.listen(config.port, () => {
  console.log('Server has been started', config);
});
