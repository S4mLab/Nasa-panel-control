const express = require('express');
const {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
} = require('./launches.controller');

const launchesRouter = express.Router();

launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post('/', httpAddNewLaunch);
// /id is an express parameter syntax
launchesRouter.delete('/:id', httpAbortLaunch);

module.exports = launchesRouter;
