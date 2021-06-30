const RssSubscriptionService = require('../Services/rssSubscriptionService');
const JwtHelper = require('../Helpers/jwtTokenHelper');
const Boom = require('boom');

module.exports.addRssSubscriptionByUrl = async (request, reply) => {
    try {
        const decoded = JwtHelper.tokenVerifyDecoder(request.headers.authorization);
        console.log(decoded);
        let user = {
            rssFeedUrl: request.payload.rssFeedUrl,
            userId: decoded.userId
        }
        let data = await RssSubscriptionService.addRssSubcriptionByUrl(user);
        if (data.isSubscriptionSuccess) {
            let response = reply({ message: data.message });
            response.code(200);
            return response;
        }
        else {
            let response = reply({ message: data.message });
            response.code(500);
            return response;
        }

    } catch (error) {
        return reply(Boom.boomify(error));
    }
}

module.exports.getRssSubscriptionList = async (request, reply) => {
    try {
        const decoded = JwtHelper.tokenVerifyDecoder(request.headers.authorization);
        const user = {
            userId: decoded.userId
        }
        let data = await RssSubscriptionService.getRssSubscriptionList(user);
        let response = reply({ message: data.message, subcriptionList: data.rssSubscriptions });
        response.code(200);
        return response;
    } catch (error) {
        return reply(Boom.boomify(error));
    }
}

module.exports.manageRssSubscription = async (request, reply) => {
    try {
        const decoded = JwtHelper.tokenVerifyDecoder(request.headers.authorization);
        console.log(decoded);
        let user = {
            subscriptionId: request.payload.subscriptionId,
            rssId: request.payload.rssId,
            userId: decoded.userId,
            action: request.payload.action
        }
        let data = await RssSubscriptionService.manageRssSubcription(user);
        if (data.isActionSuccess) {
            let response = reply({ message: data.message });
            response.code(200);
            return response;
        }
        else {
            let response = reply({ message: data.message });
            response.code(500);
            return response;
        }

    } catch (error) {
        return reply(Boom.boomify(error));
    }
}
