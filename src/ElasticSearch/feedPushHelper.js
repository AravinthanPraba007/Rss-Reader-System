const FeedIndex = require('./feedIndex');

module.exports.pushFeedsToKibana = async function (dataBody) {
    let bulkData = [];
    dataBody.forEach((data) => {
        if (data.id) {
            bulkData.push({ "index": { _index: 'rssfeeds', _type: 'doc', _id: data.id } });
            bulkData.push(data);
        }
    });
    await FeedIndex.addFeeds(bulkData);
}