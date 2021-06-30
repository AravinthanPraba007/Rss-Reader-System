const UserFeedService = require('../Services/userFeedService');
const SiteFeedService = require('../Services/siteFeedService');
const FeedsService = require('../Services/feedsService');
const StoreFeedsService = require('../Services/feedsStoreService');
const SearchFeedsService = require('../Services/feedsSearchService')
const JwtHelper = require('../Helpers/jwtTokenHelper');
const Boom = require('boom');
const { feedStore } = require('../Helpers/feedStoreHelper');

module.exports.getUserFeeds = async (request, reply) => {
    try {
        const decoded = JwtHelper.tokenVerifyDecoder(request.headers.authorization);
        console.log(decoded);
        let user = {
            page: request.payload.page,
            userId: decoded.userId
        }
        let data = await UserFeedService.getUserFeed(user);
        if (data.isUserFeedsFetched) {
            let response = reply({ message: data.message, feeds: data.userFeeds });
            response.code(200);
            return response;
        }
        else {
            let response = reply({ message: data.message });
            response.code(500);
            return response;
        }

    } catch (error) {
        console.log(error);
        return reply(Boom.boomify(error));
    }
}

module.exports.getSiteFeeds = async (request, reply) => {
    try {
        let site = {
            page: request.payload.page,
            rssId: request.payload.rssId
        }
        let data = await SiteFeedService.getSiteFeed(site);

        if (data.isSiteFeedsFetched) {
            let response = reply({ message: data.message, feeds: data.siteFeeds });
            response.code(200);
            return response;
        }
        else {
            let response = reply({ message: data.message });
            response.code(500);
            return response;
        }

    } catch (error) {
        console.log(error);
        return reply(Boom.boomify(error));
    }
}


module.exports.getAvailableFeeds = async (request, reply) => {
    try {
        
        let data = await FeedsService.getAvailableFeeds();

        if (data.isFeedsFetched) {
            let response = reply({ message: data.message, feeds: data.feeds });
            response.code(200);
            return response;
        }
        else {
            let response = reply({ message: data.message });
            response.code(500);
            return response;
        }

    } catch (error) {
        console.log(error);
        return reply(Boom.boomify(error));
    }
}


module.exports.pushFeeds = async (request, reply) => {
    try {
        
        let data = await StoreFeedsService.storeFeedsToElasticSearch();

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
        console.log(error);
        return reply(Boom.boomify(error));
    }
}

module.exports.getSearchFeeds = async (request, reply) => {
    try {
        let searchText = request.payload.searchText
        let data = await SearchFeedsService.searchFeeds(searchText);
    
        if (data.isSearchDone) {
            let response = reply({ message: data.message, feeds: data.searchFeeds });
            response.code(200);
            return response;
        }
        else {
            let response = reply({ message: data.message });
            response.code(500);
            return response;
        }

    } catch (error) {
        console.log(error);
        return reply(Boom.boomify(error));
    }
}

module.exports.getRssSiteFeeds = async (request, reply) => {
    try {
        let rssFeedUrl = request.payload.rssFeedUrl;
        let data = await FeedsService.getRssSiteFeedsByUrl(rssFeedUrl)
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
        let data = await FeedsService.getRssSiteFeedsFromWeb(rssFeedUrl)
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
        let data = await StoreFeedsService.storeRssSiteFeeds(rssFeedUrl);
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