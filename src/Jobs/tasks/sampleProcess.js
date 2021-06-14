const { sampleQueue } = require('../queues/sampleQueue');

module.exports.sampleProcessor = async (job) => {
    console.log("Executing the job");
    // console.log(job);
    console.log(new Date());
    return new Promise.resolve();
}
    

