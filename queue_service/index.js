const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {checkBodyData} = require('./services/checker');
const jobEnums = require('../enums/jobEnums');
const kue = require('kue');
const config = require('./config.json');

const queue = kue.createQueue({
  redis: config.redis
});

app.use(bodyParser.json());

app.post('/create-cert', function (req, res) {
  checkBodyData(req.body);
  const {domain, method} = req.body;

  queue.create(jobEnums.CREATE_CERT, {
    domain,
    method
  }).save();

  console.log(`Saved job queue with domain ${domain}`);

  res.sendStatus(200);
});

const server = app.listen(3001, function () {
  const {address, port} = server.address();

  console.log(`Queue microservice started at port ${port}`)
});