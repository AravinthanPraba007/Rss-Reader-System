const FeedParser = require('../Helpers/feedReaderHelper');
const FeedParser2 = require('../Helpers/feedReaderHelper2');

module.exports.getRssSiteFeeds = async function(rssFeedUrl) {

    try {
        let response = {
            isFeedsFetched : false,
            rssSiteFeeds : []
        }
        rssFetchData1 = await FeedParser.rssParser(rssFeedUrl);
        if(rssFetchData1.statusCode && rssFetchData1.statusCode === 200) {
            response.isFeedsFetched = true;
            response.message = "Feeds fetched successfully";
            response.rssSiteFeeds.push(rssFetchData1);
            return response
        }
        else {
            response.message = rssFetchData1;
            return response
        }

    } catch (error) {
        return error;
    }
}

