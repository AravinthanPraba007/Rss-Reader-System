const Queue = require('bull');
const { storeFeedsProcessor } = require('../tasks/storeFeedsProcess');

const storeFeedsQueue = new Queue('storeFeeds', {
  redis: {
    host: "127.0.0.1",
    port: 6379,
  },
});

storeFeedsQueue.process(storeFeedsProcessor);

module.exports.triggerFeedStoreJob = (data) => {
  console.log("Adding Store Feeds job to queue - For Rss Site Id : " + data.id);
  storeFeedsQueue.add(data, { removeOnComplete: true });
}

module.exports.fetchFeedsQueue = storeFeedsQueue;