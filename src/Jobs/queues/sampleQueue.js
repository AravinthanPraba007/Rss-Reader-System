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
    console.log("Adding the job to queue");
    let data ="sample data";
    sampleQueue.add(data ,{repeat: {cron: '33 * * * *'}});
}
  
module.exports.sampleQueue = sampleQueue;