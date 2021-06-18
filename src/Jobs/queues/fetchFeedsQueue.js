const Queue = require('bull');
const { fetchFeedsProcessor} = require('../tasks/fetchFeedsProcess');


const fetchFeedsQueue = new Queue('fetchFeeds', {
    redis: {
      host: "127.0.0.1",
      port: 6379,
    },
  });

fetchFeedsQueue.process(fetchFeedsProcessor);

module.exports.triggerFeedFetchJob = () => {
    console.log("Adding Fetch Feeds job to queue");
    console.log(new Date());
    fetchFeedsQueue.add(null,{repeat: {cron: '*/5 * * * *'},removeOnComplete : true});
}
  
module.exports.fetchFeedsQueue = fetchFeedsQueue;