const Joi = require('joi');
const RssSiteController = require('../Controllers/rssSiteController');
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
]