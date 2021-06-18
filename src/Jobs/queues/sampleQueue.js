const Queue = require('bull');
const { sampleProcessor } = require('../tasks/sampleProcess');


const sampleQueue = new Queue('sample', {
    redis: {
      host: "127.0.0.1",
      port: 6379,
    },
  });

const options = {
    repeat: {
      cron: "2 * * * *",
    },
  };

sampleQueue.process(sampleProcessor);

module.exports.triggerJob = () => {
    console.log("Adding Sample job to queue");
    sampleQueue.add(null,{repeat: {cron: '13 * * * *'}});
}
  
module.exports.sampleQueue = sampleQueue;