const Joi = require('joi');
const RssSubscriptionController = require('../Controllers/rssSubscriptionController');
module.exports = [
    {
        method: 'POST',
        path: '/addRssSubscription',
        
        config: {
            auth: 'jwt',
            validate: {
                payload: Joi.object({
                    rssFeedUrl: Joi.string().uri().required()
                })
            },
            handler: async (request, reply) => {
                return RssSubscriptionController.addRssSubscriptionByUrl(request, reply);
            }
        }
    },
    {
        method: 'GET',
        path: '/getRssSubscriptionList',
        
        config: {
            auth: 'jwt',
            validate: {
            },
            handler: async (request, reply) => {
                return RssSubscriptionController.getRssSubscriptionList(request, reply);
            }
        }
    }
]