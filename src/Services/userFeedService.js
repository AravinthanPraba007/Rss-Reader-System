const { QueryTypes, Op } = require('sequelize');
const { UserRssSubscription,RssFeed, sequelize } = require('../../models');

module.exports.getUserFeed = async function (userData) {
    try {

        let offsetValue = (userData.page -1)*10;
        let response = {
            isUserFeedsFetched : false,
            userFeeds: []
        };
        // let subscriptionList = await UserRssSubscription.findAll({
        //     where: {
        //         user_id: userData.userId
        //     },
        //     include: 'RssSite'
        // });
        let rssSiteList = [];
        rssSiteList = await sequelize.query('SELECT rss_id FROM user_rss_subscription where user_id = :userId AND "deletedAt" IS NULL', 
        {
            replacements: { userId: userData.userId },
            type: QueryTypes.SELECT 
          });
          console.log(rssSiteList);
          let rssSiteIds = [];
          rssSiteList.map((rssSite) => {
            rssSiteIds.push(rssSite.rss_id);
          })
          console.log(rssSiteIds.toString());
        let feeds = await RssFeed.findAndCountAll({
            where: {
                rss_id : { [Op.in]: rssSiteIds }
            },
            order: [["createdAt", "DESC"]],
            offset: offsetValue,
            limit: 10
        })
        console.log(feeds);
        response.isUserFeedsFetched = true;
        response.userFeeds = feeds;
        response.message = "User subscription fetched successfully";
        return response;

    } catch (error) {
        console.log(error);
        return error;
    }
}