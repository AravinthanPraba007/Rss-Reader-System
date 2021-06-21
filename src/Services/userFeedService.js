const { QueryTypes, Op } = require('sequelize');
const { UserRssSubscription, RssFeed, sequelize } = require('../../models');
const StatusMessage = require('../Constants/statusMessages');

module.exports.getUserFeed = async function (userData) {
    try {
        // Offset value is the starting point for each page  
        // Example for page 1 => offset = 1, page 2 => offset = 10 , 
        // offset = (subract one from page no and mulitply by 10)
        let offsetValue = (userData.page - 1) * 10;
        let response = {
            isUserFeedsFetched: false,
            userFeeds: []
        };
        let rssSiteList = [];
        rssSiteList = await sequelize.query('SELECT rss_id FROM user_rss_subscription where user_id = :userId AND "deletedAt" IS NULL',
            {
                replacements: { userId: userData.userId },
                type: QueryTypes.SELECT
            });
        let rssSiteIds = [];
        rssSiteList.map((rssSite) => {
            rssSiteIds.push(rssSite.rss_id);
        })
        let feeds = await RssFeed.findAndCountAll({
            where: {
                rss_id: { [Op.in]: rssSiteIds }
            },
            order: [["createdAt", "DESC"]],
            offset: offsetValue,
            limit: 10
        })
        response.isUserFeedsFetched = true;
        response.userFeeds = feeds;
        response.message = StatusMessage.User_Subscription_Feeds_Fetched_Success;
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}