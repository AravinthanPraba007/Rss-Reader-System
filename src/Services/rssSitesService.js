const { RssSite } = require('../../models');
const StatusMessage = require('../Constants/statusMessages');

module.exports.getAvaliableRssSites = async () => {
    try {
        let rssSiteList = await RssSite.findAll();
        let response = { message: StatusMessage.Fetch_Available_Rss_Sites, rssSubscriptions: rssSiteList};
        return response;
        
    } catch (error) {
        return error;
    }
}