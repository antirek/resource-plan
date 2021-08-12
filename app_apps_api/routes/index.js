const express = require('express');
const { customAlphabet } = require('nanoid');
const { redis } = require('../config/default');

const nanoid = customAlphabet('1234567890abcdef', 10);
const generate = () => {
  return nanoid();
}

const {
  Account,
  AccountResource,
  ARLog,
} = require('./../../app_ui/server/models/');

const createRouter = (redisClient) => {
  const router = express.Router();// eslint-disable-line new-cap

  router.get('/available/:accountId/:resourceId', async (req, res) => {
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

  router.get('/decrease/:accountId/token', async (req, res) => {
    const {accountId} = req.params;
    const token = generate();
    const key = `${accountId}-${token}`;
    await redisClient.set(key, 1);
    await redisClient.expire(key, 100);
    console.log('decrease token', accountId, token);
    res.jsend.success({token});
  });

  router.get('/decrease/:accountId/:resourceId/:value/:token', async (req, res) => {
    const {accountId, resourceId, value, token} = req.params;

    console.log('decrease', {accountId, resourceId, value, token});
    try {
      const key = `${accountId}-${token}`;
      const rValue = await redisClient.get(key);
      if (!rValue) {
        console.log('not valid token');
        return res.jsend.error('not valid token');
      }
      await redisClient.del(key);

      console.log('token valid');
      const ar = await AccountResource.findOne({accountId, resourceId});
      const oldValue = Number(ar.value);
      const operation = 'decrease';
      const diffValue = Number(value);
      const newValue = oldValue - diffValue;
      const date = new Date();

      console.log('new value', newValue);
      const arlogData = {
        date,
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
      ar.lastChanged = date;

      console.log('before save');
      await ar.save();
      await arlog.save();

      res.jsend.success(arlogData);
    }
    catch (e) {

    }
  });

  return router;
}

module.exports = {
  createRouter,
};
