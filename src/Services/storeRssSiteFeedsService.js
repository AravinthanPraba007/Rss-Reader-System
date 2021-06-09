
const FeedParser = require('../Helpers/feedReaderHelper');
const { RssSite, RssFeed } = require('../../models');
const FeedFetchAndStoreHelper = require('../Helpers/feedFetchandStoreHelper');
const StatusMessage = require('../Constants/statusMessages');
const RssSiteHelper = require('../Helpers/rssSiteHelper');

module.exports.storeRssSiteFeeds = async function (rssFeedUrl) {

    try {
        let response = {
            isFeedsStored: false
        }
        let rssUrlAlreadyExist = await isRssUrlExist(rssFeedUrl);
        if (rssUrlAlreadyExist.rssSiteFound) {
            let data = await RssSiteHelper.storeRssSiteFeeds(rssFeedUrl, rssUrlAlreadyExist.rssSite);
            if (data.isFeedsStored) {
                response.message = data.message;
                response.isFeedsStored = true;
                return response;
            }
            else {
                response.message = data.message;
                return response;
            }
        }
        else {
            // response.message = "Given Rss Site is not registered";
            response.message = StatusMessage.Given_RssSite_Not_Registered;
            return response;
        }

    } catch (error) {
        throw error;
    }
}

async function isRssUrlExist(rssUrl) {
    let response = {
        rssSiteFound: false
    }
    try {
        let rssSite = await RssSite.findOne({
            where: {
                url: rssUrl
            }
        });
        if (rssSite) {
            response.rssSiteFound = true;
            response.rssSite = rssSite.dataValues;
            return response;
        }
        return response;
    } catch (error) {
        return error;
    }
}
