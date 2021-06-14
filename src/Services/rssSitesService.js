const { RssSite } = require('../../models');
const StatusMessage = require('../Constants/statusMessages');
const FeedParser = require('../Helpers/feedReaderHelper');

module.exports.getAvaliableRssSites = async () => {
    try {
        let rssSiteList = await RssSite.findAll();
        let response = { message: StatusMessage.Fetch_Available_Rss_Sites, rssSubscriptions: rssSiteList};
        return response;
        
    } catch (error) {
        return error;
    }
}

module.exports.getRssSiteFromWeb = async function(rssFeedUrl) {

    try {
        let response = {
            isRssSiteFetched : false,
        }
        
        let fetchedFeeds;
        let data = await FeedParser.rssParser(rssFeedUrl);
        if (data.statusCode && data.statusCode === 200) {
            fetchedFeeds = parseFetchedRssSiteDetails(data);
            response.isRssSiteFetched = true;
            response.message = "Rss site fetched sucessfully"
            response.rssSite = fetchedFeeds;
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

function parseFetchedRssSiteDetails(rssFetchData) {
    let newRssDetails = {};
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
    return newRssDetails;
}