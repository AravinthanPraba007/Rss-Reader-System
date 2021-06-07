const RssSiteService = require('../Services/rssSitesService');
const RssSiteFeedService = require('../Services/rssSiteFeedsService');
const StoreRssSiteFeedService = require('../Services/storeRssSiteFeedsService');
const Boom = require('boom');

module.exports.getAvailableRssSites = async (request, reply) => {
    try {
        let data = await RssSiteService.getAvaliableRssSites();
        let response = reply({ message: data.message, rssSiteList: data.rssSubscriptions });
        response.code(200);
        return response;
    } catch (error) {
        return reply(Boom.boomify(error));
    }

}

module.exports.getRssSiteFeeds = async (request, reply) => {
    try {
        let rssFeedUrl = request.payload.rssFeedUrl;
        let data = await RssSiteFeedService.getRssSiteFeeds(rssFeedUrl)
        if (data.isFeedsFetched) {
            let response = reply({ message: data.message, rssSiteFeeds: data.rssSiteFeeds });
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

module.exports.storeRssSiteFeeds = async (request, reply) => {
    try {
        let rssFeedUrl = request.payload.rssFeedUrl;
        let data = await StoreRssSiteFeedService.storeRssSiteFeeds(rssFeedUrl)
        if (data.isFeedsStored) {
            let response = reply({ message: data.message});
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