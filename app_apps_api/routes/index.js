const express = require('express');
const {
  Account,
  AccountResource,
  ARLog,
} = require('./../../app_ui/server/models/');

const router = express.Router();// eslint-disable-line new-cap

router.get('/getAvailable/:accountId/:resourceId', async (req, res) => {
  const {accountId, resourceId} = req.params;
  try {
    const ar = await AccountResource.findOne({accountId, resourceId});

    const data = {
      accountId,
      resourceId,
      value: ar.value > 0 ? ar.value : 0,
    };

    console.log('data', data);
    res.json(data);
  }
  catch (e) {

  }
});

router.get('/decrease/:accountId/:resourceId/:value', async (req, res) => {
  const {accountId, resourceId, value} = req.params;

  console.log('decrease', {accountId, resourceId, value});
  try {
    const ar = await AccountResource.findOne({accountId, resourceId});
    const oldValue = Number(ar.value);
    const operation = 'decrease';
    const diffValue = Number(value);
    const newValue = oldValue - diffValue;

    console.log('new value', newValue);
    const arlogData = {
      date: new Date(),
      resourceId,
      accountId,
      operation,
      oldValue,
      diffValue,
      newValue,
      appId: 'test',
    };

    console.log('ar log data', arlogData);
    const arlog = new ARLog(arlogData);
    ar.value = newValue;

    console.log('before save');
    await ar.save();
    await arlog.save();

    res.json(arlogData);
  }
  catch (e) {

  }
});

module.exports = {
    appsRouter: router,
};
