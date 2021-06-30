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
        path: '/getRssSiteDetails',
        config: {
            auth: false,
            validate: {
                payload: Joi.object({
                    rssId: Joi.number().required()
                })
            },
            handler: async (request, reply) => {
                return RssSiteController.getRssSiteDetails(request, reply);
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