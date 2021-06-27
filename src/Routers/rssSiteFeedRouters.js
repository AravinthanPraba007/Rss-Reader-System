const Joi = require('joi');
const RssSiteFeedController = require('../Controllers/rssSiteFeedController');

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
                return RssSiteFeedController.getUserFeeds(request, reply);
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
                return RssSiteFeedController.getSiteFeeds(request, reply);
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
                return RssSiteFeedController.getAvailableFeeds(request, reply);
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
                return RssSiteFeedController.pushFeeds(request, reply);
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
                return RssSiteFeedController.getSearchFeeds(request, reply);
            }
        }
    },
]