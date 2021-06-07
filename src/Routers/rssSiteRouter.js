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
            return RssSiteController.GetAvailableRssSites(request, reply);
        }
    }
}
]