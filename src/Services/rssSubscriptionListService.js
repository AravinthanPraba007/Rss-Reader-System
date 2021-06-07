const { UserRssSubscription } = require('../../models');
const StatusMessage = require('../Constants/statusMessages');

module.exports.getRssSubscriptionList = async (userData) => {
    try {
        let response = {
            isSubscriptionListFetched : false
        };
        let subscriptionList = await UserRssSubscription.findAll({
            where: {
                user_id: userData.userId
            },
            include: 'RssSite'
        });
        response.isSubscriptionListFetched = true;
        response.rssSubscriptions = subscriptionList;
        response.message = StatusMessage.Fetch_Rss_Subscription_List_Success
        return response;

    } catch (error) {
        return error;
    }
}