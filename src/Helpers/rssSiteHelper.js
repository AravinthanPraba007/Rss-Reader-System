const FeedParser = require('../Helpers/feedReaderHelper');
const { RssSite, RssFeed } = require('../../models');
const FeedHelper = require('../Helpers/feedHelper');

module.exports.addNewRssSite = async function (rssFeedUrl) {

    try {
        let response = {
            isRssSiteStored: false,
            isFeedsStored: false
        }
        /**
         * 1. Try to check already rss site already present
         * 2. If not fetch the rss site feed and store it
         */
            let rssFetchData = await FeedParser.rssParser(rssFeedUrl);
            if (rssFetchData.statusCode && rssFetchData.statusCode === 200) {
                let newRssDetails = {};
                newRssDetails.rssFeedUrl = rssFeedUrl;
                if (rssFetchData.content && rssFetchData.content.head) {
                    if (rssFetchData.content.head.title)
                        newRssDetails.title = rssFetchData.content.head.title;
                    if (rssFetchData.content.head.description)
                        newRssDetails.description = rssFetchData.content.head.description;
                    if (rssFetchData.content.head.link)
                        newRssDetails.siteLink = rssFetchData.content.head.link;
                    if (rssFetchData.content.head.image && rssFetchData.content.head.image.url)
                        newRssDetails.imageUrl = rssFetchData.content.head.image.url;
                }
                let savedRssSite = await RssSite.create({
                    url: rssFeedUrl,
                    title: newRssDetails.title,
                    description: newRssDetails.description,
                    siteLink: newRssDetails.siteLink,
                    imageUrl: newRssDetails.imageUrl
                });
                response.isRssSiteStored = true;
                response.rssSiteId = savedRssSite.dataValues.id;
                let data = await FeedHelper.storeFeed(savedRssSite.dataValues, rssFetchData);
                if (data.isFeedsStored) {
                    response.isFeedsStored = true;
                    return response;
                }
                else {
                    response.message = data.message;
                    return response;
                }
            }
            else {
                response.message = rssFetchData;
                return response;
            }
    } catch (error) {
        throw new Error(error);
    }

}

module.exports.storeRssSiteFeeds = async function (rssFeedUrl, rssSite) {

    try {
        let response = {
            isFeedsStored: false
        }
            let rssFetchData = await FeedParser.rssParser(rssFeedUrl);
            if (rssFetchData.statusCode && rssFetchData.statusCode === 200) {
                let data = await FeedHelper.storeFeed(rssSite, rssFetchData);
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
                response.message = rssFetchData;
                return response;
            }
    } catch (error) {
        throw new Error(error);
    }

}


