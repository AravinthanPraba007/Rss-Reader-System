const FeedParser = require('../Helpers/feedReaderHelper');
const { RssSite, RssFeed } = require('../../models');
const StatusMessage = require('../Constants/statusMessages');

module.exports.getRssSiteFeedsByUrl = async function (rssFeedUrl) {
    try {
        let response = {
            isFeedsFetched: false,
        }
        let rssSite = await RssSite.findOne({
            where: {
                url: rssFeedUrl
            }
        });
        if (rssSite) {
            const rssSiteId = rssSite.dataValues.id;
            let fetchedFeeds = await RssFeed.findAll({
                where: {
                    rss_id: rssSiteId
                }
            });
            response.isFeedsFetched = true;
            response.message = StatusMessage.Feed_Fetched_Success;
            response.rssSiteFeeds = fetchedFeeds;
            return response;
        }
        else {
            response.message = StatusMessage.RssSite_Not_Registered;
            return response;
        }
    } catch (error) {
        return error;
    }
}

module.exports.getRssSiteFeedsFromWeb = async function (rssFeedUrl) {
    try {
        let response = {
            isFeedsFetched: false,
        }
        let fetchedFeeds;
        let data = await FeedParser.rssParser(rssFeedUrl);
        if (data.statusCode && data.statusCode === 200) {
            fetchedFeeds = data.content.items;
            response.isFeedsFetched = true;
            response.message = StatusMessage.Feed_Fetched_Success;
            response.rssSiteFeeds = fetchedFeeds;
            return response;
        }
        else {
            response.message = data.message;
            return response;
        }
    } catch (error) {
        return error;
    }
}

module.exports.getAvailableFeeds = async function () {
    try {
        let response = {
            isFeedsFetched: false,
            feeds: []
        };
        let feeds = await RssFeed.findAll();
        response.isFeedsFetched = true;
        response.feeds = feeds;
        response.message = StatusMessage.Site_Feeds_Fetched_Success;
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}
