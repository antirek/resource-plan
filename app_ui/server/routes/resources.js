const express = require('express');
const {Account} = require('./../models');
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
