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
    unique: true,
  },
  title: String,
  key: String,
});

const accountSchema = new mongoose.Schema({
  accountId: {
    type: String,
    index: true,
    unique: true,
  },
  title: String,
  timezone: String,
});

const resourceSchema = new mongoose.Schema({
  resourceId: {
    type: String,
    index: true,
    unique: true,
  },
  title: String,
  description: String,
});

const accountResourceSchema = new mongoose.Schema({
  accountId: {
    type: String,
    required: true,
  },
  resourceid: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
    default: 0,
  },
  lastChanged: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

const arLogSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  accountId: {
    type: String,
    required: true,
  },
  resourceId: {
    type: String,
    required: true,
  },
  oldValue: {
    type: Number,
    required: true,
  },
  operation: {
    type: String,
    required: true,
  },
  diffValue: {
    type: Number,
    required: true,
  },
  newValue: {
    type: Number,
    required: true,
  },
  appId: {
    type: String,
    required: true,
  },
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
