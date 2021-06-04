const Joi = require('joi');
const RssSubscriptionController = require('../Controllers/rssSubscriptionController');
module.exports = [
    {
        method: 'post',
        path: '/rssSubscription',
        
        config: {
            validate: {
                payload: Joi.object({
                    rssFeedUrl: Joi.string().uri().required()
                })
            },
            handler: async (request, reply) => {
                return RssSubscriptionController.AddRssSubscription(request.payload, reply);
            }
        }
    }
]