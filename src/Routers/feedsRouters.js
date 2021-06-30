const Joi = require('joi');
const FeedsController = require('../Controllers/feedsController');

module.exports = [
    {
        method: 'POST',
        path: '/getUserFeeds',
        config: {
            auth: 'jwt',
            validate: {
                payload: Joi.object({
                    page: Joi.number().required()
                })
            },
            handler: async (request, reply) => {
                return FeedsController.getUserFeeds(request, reply);
            }
        }
    },
    {
        method: 'POST',
        path: '/getSiteFeeds',
        config: {
            auth: 'jwt',
            validate: {
                payload: Joi.object({
                    page: Joi.number().required(),
                    rssId: Joi.number().required()
                })
            },
            handler: async (request, reply) => {
                return FeedsController.getSiteFeeds(request, reply);
            }
        }
    },
    {
        method: 'GET',
        path: '/availableFeeds',
        config: {
            auth: false,
            validate: {
            },
            handler: async (request, reply) => {
                return FeedsController.getAvailableFeeds(request, reply);
            }
        }
    },
    {
        method: 'POST',
        path: '/getRssSiteFeeds',
        config: {
            auth: false,
            validate: {
                payload: Joi.object({
                    rssFeedUrl: Joi.string().uri().required()
                })
            },
            handler: async (request, reply) => {
                return FeedsController.getRssSiteFeeds(request, reply);
            }
        }
    },
    {
        method: 'POST',
        path: '/getRssSiteFeedsFromWeb',
        config: {
            auth: false,
            validate: {
                payload: Joi.object({
                    rssFeedUrl: Joi.string().uri().required()
                })
            },
            handler: async (request, reply) => {
                return FeedsController.getRssSiteFeedsFromWeb(request, reply);
            }
        }
    },
    {
        method: 'GET',
        path: '/pushFeeds',
        config: {
            auth: false,
            validate: {
            },
            handler: async (request, reply) => {
                return FeedsController.pushFeeds(request, reply);
            }
        }
    },
    {
        method: 'POST',
        path: '/searchFeed',
        config: {
            auth: false,
            validate: {
                payload: Joi.object({
                    searchText: Joi.string().required(),
                })
            },
            handler: async (request, reply) => {
                return FeedsController.getSearchFeeds(request, reply);
            }
        }
    },
    {
        method: 'POST',
        path: '/storeRssSiteFeeds',
        config: {
            auth: false,
            validate: {
                payload: Joi.object({
                    rssFeedUrl: Joi.string().uri().required()
                })
            },
            handler: async (request, reply) => {
                return FeedsController.storeRssSiteFeeds(request, reply);
            }
        }
    },

    {
        method: 'GET',
        path: '/storeFeeds',
        config: {
            auth: false,
            validate: {
            },
            handler: async (request, reply) => {
                return FeedsController.storeFeeds(request, reply);
            }
        }
    },
]