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
        if(rssSite){
        const rssSiteId = rssSite.dataValues.id;
        let fetchedFeeds = await RssFeed.findAll({
            where: {
                rss_id: rssSiteId
            }
        });
        response.isFeedsFetched = true;
        response.message = "Rss site feeds fetched sucessfully"
        response.rssSiteFeeds = fetchedFeeds;
        return response;
    }
    else {
        response.message = "Provide rss site is not registered";
        return response;
    }

    } catch (error) {
        return error;
    }
}



module.exports.getRssSiteFeedsFromWeb = async function(rssFeedUrl) {

    try {
        let response = {
            isFeedsFetched : false,
        }
        
        let fetchedFeeds;
        let data = await FeedParser.rssParser(rssFeedUrl);
        if (data.statusCode && data.statusCode === 200) {
            fetchedFeeds = data.content.items;
            response.isFeedsFetched = true;
            response.message = "Rss site feeds fetched sucessfully"
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

