const kue = require('kue');
const queue = kue.createQueue();
const jobEnums = require('../enums/jobEnums');
const selfsigned = require('selfsigned');
const request = require('request');
const config = require('./config.json');

queue.process(jobEnums.CREATE_CERT, function (job, done) {
  const {domain, method} = job.data;
  const certAttributes = [
    {
      name: 'commonName',
      value: domain
    },
  ];

  selfsigned.generate(certAttributes, {days: 365}, function (err, pems) {
    if (err) {
      return done(new Error(err));
    }

    sendRequest({method, domain, cert: pems.cert, done, currentTry: 1});
  });
});

function sendRequest({method, domain, cert, done, currentTry}) {
  if (currentTry > config.retry_max_times) {
    return done();
  }

  const uri = `http://${domain}?Cert=${cert}`;

  request({
      method,
      uri
    },
    {timeout: 5000},
    function (err, res, body) {
      if (err) {
        console.log(err);
        return setTimeout(() => {
          sendRequest({method, domain, cert, done, currentTry: currentTry + 1});
        }, config.retry_seconds * 1000);
      }

      done();
    });
}
