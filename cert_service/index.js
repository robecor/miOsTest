const kue = require('kue');
const queue = kue.createQueue();
const jobEnums = require('../enums/jobEnums');

queue.process(jobEnums.CREATE_CERT, function (job, done) {
  console.log(job.data);
  done();
});
