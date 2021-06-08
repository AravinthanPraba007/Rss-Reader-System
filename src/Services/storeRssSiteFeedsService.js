
const FeedParser = require('../Helpers/feedReaderHelper');
const { RssSite, RssFeed } = require('../../models');
const FeedFetchAndStoreHelper = require('../Helpers/feedFetchandStoreHelper');
const StatusMessage = require('../Constants/statusMessages');

module.exports.storeRssSiteFeeds = async function (rssFeedUrl) {

    try {
        let response = {
            isFeedsStored: false
        }
        let data = await FeedFetchAndStoreHelper.fetchAndStoreFeed(rssFeedUrl);
        
        if(data.isFetchAndStoreDone) {
            response.message = StatusMessage.Feed_Fetch_And_Store_Success_Message;
            response.isFeedsStored = true;
            return response;
        }
        else{
            response.message = data.message;
            return response;
        }
    } catch (error) {
        throw error;
    }
}
