const { RssFeed } = require('../../models');
const StatusMessage = require('../Constants/statusMessages');
const feedKibanaHelper = require('../ElasticSearch/feedHelper');

module.exports.pushFeeds = async function () {
    try {
        let response = {
            isFeedsStored: false
        };
        let feeds = [];
        let feedsdata = [];
        feeds = await RssFeed.findAll();
        feeds.forEach(feed => {
            feedsdata.push(feed.dataValues);
        });
        // console.log(feedsdata);
        await feedKibanaHelper.pushFeedsToKibana(feedsdata);
        response.isFeedsStored = true;
        response.message = StatusMessage.Site_Feeds_Fetched_Success;
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports.searchFeeds = async function (searchText) {
    try {
        let response = {
            isSearchDone: false,
            searchFeeds: []
        };
        let data = await feedKibanaHelper.searchFeeds(searchText);
        if (data.isSearchDone) {
            response.searchFeeds = data.feeds;
            response.isSearchDone = true;
            response.message = StatusMessage.Site_Feeds_Fetched_Success;
            return response;
        }
        else {
            return response;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}