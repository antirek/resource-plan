const express = require('express');
const moment = require('moment');
const {Account, AccountResource, ARLog } = require('./../models');
const router = express.Router();// eslint-disable-line new-cap

router.get('/', async (req, res) => {
  try {
    const accounts = await Account.find();
    console.log('accounts', accounts);
    res.json(accounts)
  }
  catch (e) {

  }
});

router.get('/:accountId/resources', async (req, res) => {
  const {accountId} = req.params;
  try {
    const resources = await AccountResource.find({accountId});
    console.log('accountId', accountId, 'resources', resources);
    res.json(resources);
  }
  catch (e) {

  }
});

router.get('/:accountId/logs', async (req, res) => {
  const {accountId} = req.params;
  try {
    const logs = await ARLog.find({accountId});
    console.log('accountId', accountId, 'logs', logs);
    res.json(logs);
  }
  catch (e) {

  }
});

router.get([
  '/:accountId/usage',
  '/:accountId/usage/:date',
], async (req, res) => {
  const { accountId, date } = req.params;
  try {    
    const todayStart = moment(date).format('YYYY-MM-DD 00:00:00');
    const todayEnd = moment(date).format('YYYY-MM-DD 23:59:59');

    const query = {
      accountId,
      date: {
        $gte: todayStart,
        $lte: todayEnd,
      },
      operation: 'decrease',
    };
    console.log('usage query', query);
    const logs = await ARLog.find(query);

    const resources = [...new Set(logs.map(x => x.resourceId))];

    console.log('accountId', accountId, 'resources', resources);

    const results = {};

    resources.forEach(r => {
      results[r] = 0;
    });

    console.log('results', results);
    logs.forEach((log) => {
      results[log.resourceId] += log.diffValue;
    });

    console.log('results', results);

    const o = [];
    for (let prop in results) {
      o.push({
        resourceId: prop,
        count: results[prop],
      })
    };
    res.json(o);
  }
  catch (e) {

  }
});


router.post('/', async (req, res) => {
  const data = req.body;
  try {
    const app = new Account(data);
    await Account.save();
    console.log('new account', account);
    res.json(app)
  }
  catch (e) {

  }
});

router.post('/:accountId', async (req, res) => {
  const accountId = req.params.appId;
  const data = req.body;
  try {
    const app = await Account.findById(accountId);
    await Account.save();
    console.log('update account', app);
    res.json(app)
  }
  catch (e) {

  }
});

module.exports = router;
