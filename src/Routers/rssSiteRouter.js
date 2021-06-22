const Joi = require('joi');
const RssSiteController = require('../Controllers/rssSiteController');

module.exports = [
    {
        method: 'GET',
        path: '/getAvailableRssSites',
        config: {
            auth: false,
            validate: {
            },
            handler: async (request, reply) => {
                return RssSiteController.getAvailableRssSites(request, reply);
            }
        }
    },
    {
        method: 'POST',
        path: '/addNewRssSite',
        config: {
            auth: false,
            validate: {
                payload: Joi.object({
                    rssFeedUrl: Joi.string().uri().required()
                })
            },
            handler: async (request, reply) => {
                return RssSiteController.addRssSite(request, reply);
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
                return RssSiteController.getRssSiteFeeds(request, reply);
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
                return RssSiteController.getRssSiteFeedsFromWeb(request, reply);
            }
        }
    },
    {
        method: 'POST',
        path: '/getRssSiteFromWeb',
        config: {
            auth: false,
            validate: {
                payload: Joi.object({
                    rssFeedUrl: Joi.string().uri().required()
                })
            },
            handler: async (request, reply) => {
                return RssSiteController.getRssSiteFromWeb(request, reply);
            }
        }
    },
    {
        method: 'POST',
        path: '/getFullRssSiteDetailsFromWeb',
        config: {
            auth: false,
            validate: {
                payload: Joi.object({
                    rssFeedUrl: Joi.string().uri().required()
                })
            },
            handler: async (request, reply) => {
                return RssSiteController.getFullRssSiteDetailsFromWeb(request, reply);
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
                return RssSiteController.storeRssSiteFeeds(request, reply);
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
                return RssSiteController.storeFeeds(request, reply);
            }
        }
    },
    {
        method: 'GET',
        path: '/storeAvailableRssSitesToRedis',
        config: {
            auth: false,
            validate: {
            },
            handler: async (request, reply) => {
                return RssSiteController.storeAvailableRssSitesToRedis(request, reply);
            }
        }
    },
    {
        method: 'GET',
        path: '/getAvailableRssSitesFromRedis',
        config: {
            auth: false,
            validate: {
            },
            handler: async (request, reply) => {
                return RssSiteController.getAvailableRssSitesFromRedis(request, reply);
            }
        }
    },
]