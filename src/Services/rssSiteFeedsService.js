const FeedParser = require('../Helpers/feedReaderHelper');
const FeedParser2 = require('../Helpers/feedReaderHelper2');
const { RssSite, RssFeed } = require('../../models');

module.exports.getRssSiteFeeds = async function(rssFeedUrl) {

    try {
        let response = {
            isFeedsFetched : false,
        }
        let rssSite = await RssSite.findOne({
            where: {
                url: rssFeedUrl
            }
        });
        const rssSiteId = rssSite.dataValues.id;
        let fetchedFeeds = await RssFeed.findAll({
            where: {
                rss_id: rssSiteId
            }
        });
        response.isFeedsFetched = true;
        response.rssSiteFeeds = fetchedFeeds;
        return response;

    } catch (error) {
        return error;
    }
}

