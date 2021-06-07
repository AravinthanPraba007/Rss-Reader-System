const AddRssSubscription = require('../Services/addRssSubscriptionService');
const RssSubscriptionList = require('../Services/rssSubscriptionListService');
const JwtHelper = require('../Helpers/jwtTokenHelper');

module.exports.AddRssSubscription = async (request, reply) => {
    try {
        const decoded = JwtHelper.tokenVerifyDecoder(request.headers.authorization);
        console.log(decoded);
        let user = {
            rssFeedUrl: request.payload.rssFeedUrl,
            userId: decoded.userId
        }
        let data = await AddRssSubscription.addRssSubcription(user);
        if(data.isSubscriptionSuccess) {
            let  response = reply({ message: data.message });
            response.code(200);
            return response;
        }
        else {
            let  response = reply({ message: data.message });
            response.code(500);
            return response;
        }

    } catch (error) {
        return reply(Boom.boomify(error));
    }
}

module.exports.GetRssSubscriptionList = async (request, reply) => {
    try {
        const decoded = JwtHelper.tokenVerifyDecoder(request.headers.authorization);
        const user = {
            userId: decoded.userId
        }
        let data = await RssSubscriptionList.getRssSubscriptionList(user);
        let  response = reply({ message: data.message, subcriptionList: data.rssSubscriptions });
            response.code(200);
            return response;
    } catch (error) {
        return reply(Boom.boomify(error));
    }
}