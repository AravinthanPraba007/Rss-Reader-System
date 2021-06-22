const RssSiteService = require('../Services/rssSitesService');
const RssSiteFeedService = require('../Services/rssSiteFeedsService');
const StoreRssSiteFeedService = require('../Services/storeRssSiteFeedsService');
const StoreRssSiteService = require('../Services/addRssSiteService');
const Boom = require('boom');
const { storeFeed } = require('../Helpers/feedHelper');
const { feedStore } = require('../Helpers/feedStoreHelper');
const RedisHelper = require('../Helpers/redisHelper');

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

module.exports.addRssSite = async (request, reply) => {
    try {
        let rssFeedUrl = request.payload.rssFeedUrl;
        let data = await StoreRssSiteService.addRssSite(rssFeedUrl);
        if (data.isRssSiteAdded) {
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

module.exports.getRssSiteFeedsFromWeb = async (request, reply) => {
    try {
        let rssFeedUrl = request.payload.rssFeedUrl;
        let data = await RssSiteFeedService.getRssSiteFeedsFromWeb(rssFeedUrl)
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

module.exports.getRssSiteFromWeb = async (request, reply) => {
    try {
        let rssFeedUrl = request.payload.rssFeedUrl;
        let data = await RssSiteService.getRssSiteFromWeb(rssFeedUrl)
        if (data.isRssSiteFetched) {
            let response = reply({ message: data.message, rssSite: data.rssSite });
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

module.exports.getFullRssSiteDetailsFromWeb = async (request, reply) => {
    try {
        let rssFeedUrl = request.payload.rssFeedUrl;
        let data = await RssSiteService.getFullRssSiteDetailsFromWeb(rssFeedUrl)
        if (data.isRssSiteFetched) {
            let response = reply({ message: data.message, rssSite: data.rssSite });
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
        let data = await StoreRssSiteFeedService.storeRssSiteFeeds(rssFeedUrl);
        if (data.isFeedsStored) {
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

module.exports.storeFeeds = async (request, reply) => {
    try {
        let data = await feedStore();
        let response = reply({ message: data.message });
        response.code(200);
        return response;
    } catch (error) {
        return reply(Boom.boomify(error));
    }
}

module.exports.storeAvailableRssSitesToRedis = async (request, reply) => {
    try {
        let data = await RedisHelper.pushAvailableSites();
        let response = reply({ message: data.message });
        response.code(200);
        return response;
    } catch (error) {
        return reply(Boom.boomify(error));
    }
}

module.exports.getAvailableRssSitesFromRedis = async (request, reply) => {
    try {
        let data = await RedisHelper.getAvailableSites();
        if (data.isSiteDetailsFetched) {
            let response = reply({ message: data.message, rssSiteList: data.rssSiteList });
            response.code(200);
            return response;
        }
        else {
            let response = reply({ message: data.message });
            response.code(500);
            return response;
        }
        return response;
    } catch (error) {
        console.log(error);
        return reply(Boom.boomify(error));
    }
}
