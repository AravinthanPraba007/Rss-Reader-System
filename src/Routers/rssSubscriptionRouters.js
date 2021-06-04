const Joi = require('joi');
const RssSubscriptionController = require('../Controllers/rssSubscriptionController');
module.exports = [
    {
        method: 'post',
        path: '/addRssSubscription',
        
        config: {
            validate: {
                payload: Joi.object({
                    rssFeedUrl: Joi.string().uri().required(),
                    userId: Joi.number()
                })
            },
            handler: async (request, reply) => {
                return RssSubscriptionController.AddRssSubscription(request.payload, reply);
            }
        }
    }
]