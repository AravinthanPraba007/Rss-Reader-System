const { QueryTypes, Op } = require('sequelize');
const { UserRssSubscription, RssFeed, sequelize } = require('../../models');
const StatusMessage = require('../Constants/statusMessages');

module.exports.getSiteFeed = async function (siteData) {
    try {
        // Offset value is the starting point for each page  
        // Example for page 1 => offset = 1, page 2 => offset = 10 , 
        // offset = (subract one from page no and mulitply by 10)
        let offsetValue = (siteData.page - 1) * 10;
        let response = {
            isSiteFeedsFetched: false,
            siteFeeds: []
        };
        let feeds = await RssFeed.findAndCountAll({
            where: {
                rss_id: siteData.rssId
            },
            order: [["createdAt", "DESC"]],
            offset: offsetValue,
            limit: 10
        })
        response.isSiteFeedsFetched = true;
        response.siteFeeds = feeds;
        response.message = StatusMessage.Site_Feeds_Fetched_Success;
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}