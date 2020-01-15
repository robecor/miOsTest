const kue = require('kue');
const queue = kue.createQueue();
const jobEnums = require('../enums/jobEnums');
const selfsigned = require('selfsigned');

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
      console.log(err);
      return done(new Error(err));
    }

    done(pems);
  });
});
