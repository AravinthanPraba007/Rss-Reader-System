const { UserRssSubscription } = require('../../models');

module.exports.getRssSubscriptionList = async (userData) => {
    try {
        let subscriptionList = await UserRssSubscription.findAll({
            where: {
                user_id: userData.userId
            },
            include: 'RssSite'
        });
        let response = { message: "Sucessfully fetched the Subscription list", statusCode: 200, rssSubscriptions: subscriptionList};
        return response;

    } catch (error) {
        let response = { message: error, statusCode: 500 };
        return error
    }
}