const { RssFeed } = require('../../models');
const StatusMessage = require('../Constants/statusMessages');
const FeedsElasticSearchHelper = require('../ElasticSearch/feedsESHelper');

const RssSiteHelper = require('../Helpers/rssSiteHelper');

module.exports.storeFeedsToElasticSearch = async function () {
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
        await FeedsElasticSearchHelper.pushFeedsToES(feedsdata);
        response.isFeedsStored = true;
        response.message = StatusMessage.Site_Feeds_Fetched_Success;
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}


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
            response.message = StatusMessage.RssSite_Not_Registered;
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
