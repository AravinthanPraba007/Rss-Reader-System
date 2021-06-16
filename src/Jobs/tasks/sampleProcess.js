const { feedStore } = require('../../Helpers/feedStoreHelper');
const { feedStoreHelper } = require('../jobHelper/feedsStoreJobHelper');
const { sampleQueue } = require('../queues/sampleQueue');

module.exports.sampleProcessor = async (job,done) => {
    console.log("Executing the job");
    console.log(job);
    const feedWorkData = await feedStoreHelper();
    console.log("Error message :");
    console.log(feedStore.errorMessage);
    console.log("Success message :");
    console.log(feedStore.sucessMessage);
    console.log(new Date());
    done();
    
}
