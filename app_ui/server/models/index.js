const mongoose = require('mongoose');
const config = require('config');

const settingsConnection = mongoose.createConnection(
  config.get('settingsMongodb'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

const appSchema = new mongoose.Schema({
  appId: {
    type: String,
    index: true,
  },
  title: String,
  key: String,
});

const accountSchema = new mongoose.Schema({
  accountId: {
    type: String,
    index: true,
  },
  title: String,
  timezone: String,
});

const resourceSchema = new mongoose.Schema({
  resourceId: {
    type: String,
    index: true,
  },
  title: String,
  description: String,
});

const accountResourceSchema = new mongoose.Schema({
  accountId: String,
  resourceid: String,
  value: Number,
  lastChanged: Date,
});

const arLogSchema = new mongoose.Schema({
  accountId: String,
  resourceid: String,
  oldValue: Number,
  operation: String,
  diffValue: Number,
  newValue: Number,
  date: Date,
  appId: String,
});

const App = settingsConnection.model('apps', appSchema);
const Account = settingsConnection.model('accounts', accountSchema);
const Resource = settingsConnection.model('resources', resourceSchema);
const AccountResource = settingsConnection.model('accountresources', accountResourceSchema);

const ARLog = settingsConnection.model('arlogs', arLogSchema);

module.exports = {
  App,
  Account,
  Resource,
  AccountResource,
  ARLog,
};
