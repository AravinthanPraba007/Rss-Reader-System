const RssSiteService = require('../Services/rssSitesService');

module.exports.GetAvailableRssSites =  async (request, reply) => {
    let data = await RssSiteService.getAvaliableRssSites();
    if (data.statusCode === 200) {
    return reply({ message: data.message, rssSiteList: data.rssSubscriptions}).code(200); 
    } else{
        return reply({ message: data.message}).code(data.statusCode);  
    }
}