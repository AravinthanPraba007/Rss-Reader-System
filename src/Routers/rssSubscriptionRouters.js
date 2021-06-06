const Joi = require('joi');
const RssSubscriptionController = require('../Controllers/rssSubscriptionController');
module.exports = [
    {
        method: 'POST',
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
    },
    {
        method: 'GET',
        path: '/getRssSubscriptionList/{userId}',
        
        config: {
            validate: {
                params: {
                    userId: Joi.number()
                }
            },
            handler: async (request, reply) => {
                const user = {
                    userId : request.params.userId
                }
                return RssSubscriptionController.GetRssSubscriptionList(user, reply);
            }
        }
    }
]