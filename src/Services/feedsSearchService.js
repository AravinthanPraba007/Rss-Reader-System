const { RssFeed } = require('../../models');
const StatusMessage = require('../Constants/statusMessages');
const FeedsElasticSearchHelper = require('../ElasticSearch/feedsESHelper');

module.exports.searchFeeds = async function (searchText) {
    try {
        let response = {
            isSearchDone: false,
            searchFeeds: []
        };
        let data = await FeedsElasticSearchHelper.searchFeedsFromES(searchText);
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