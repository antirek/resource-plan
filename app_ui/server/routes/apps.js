const express = require('express');
const {App} = require('./../models');
const router = express.Router();// eslint-disable-line new-cap

router.get('/', async (req, res) => {
  try {
    const apps = await App.find();
    console.log('apps', apps);
    res.json(apps)
  }
  catch (e) {

  }
});

router.post('/', async (req, res) => {
  const data = req.body;
  try {
    const app = new App(data);
    await app.save();
    console.log('new app', app);
    res.json(app)
  }
  catch (e) {

  }
});

router.post('/:appId', async (req, res) => {
  const appId = req.params.appId;
  const data = req.body;
  try {
    const app = await App.findById(appId);
    await app.save();
    console.log('update app', app);
    res.json(app)
  }
  catch (e) {

  }
});


module.exports = router;
