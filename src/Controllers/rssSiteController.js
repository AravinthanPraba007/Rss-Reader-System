const RssSiteService = require('../Services/rssSitesService');
const Boom = require('boom');

module.exports.GetAvailableRssSites = async (request, reply) => {
    try {
        let data = await RssSiteService.getAvaliableRssSites();
        let response = reply({ message: data.message, rssSiteList: data.rssSubscriptions });
        response.code(201);
        return response;
    } catch (error) {
        return reply(Boom.boomify(error));
    }

}