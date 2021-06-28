const FeedIndex = require('./feedIndex');

module.exports.pushFeedsToKibana = async function (dataBody) {
    let bulkData = [];
    dataBody.forEach((data) => {
        if (data.id) {
            bulkData.push({ "index": { _index: 'rssfeeds', _type: 'doc', _id: data.id } });
            bulkData.push(data);
        }
    });
    if(bulkData.length > 0)
    await FeedIndex.addFeeds(bulkData);
}

module.exports.searchFeeds = async function (searchText) {
    let result = {
        feeds: [],
        isSearchDone: false
    }
    try {
        let resultData = await FeedIndex.searchFeed(searchText);
        if (resultData.isSearchDone) {
            result.feeds = resultData.data;
            result.isSearchDone = true;
            return result;
        }
        else {
            return result;
        }
    } catch (error) {
        console.log(error);
        return result;
    }

}