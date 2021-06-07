const { UserRssSubscription } = require('../../models');
const StatusMessage = require('../Constants/statusMessages');
const StatusCode = require('../Constants/statusCode');

module.exports.getRssSubscriptionList = async (userData) => {
    try {
        let subscriptionList = await UserRssSubscription.findAll({
            where: {
                user_id: userData.userId
            },
            include: 'RssSite'
        });
        let response = { message: StatusMessage.Fetch_Rss_Subscription_List_Success, statusCode: StatusCode.Success, rssSubscriptions: subscriptionList};
        return response;

    } catch (error) {
        let response = { message: error, statusCode: 500 };
        return response;
    }
}