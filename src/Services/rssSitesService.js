const { RssSite } = require('../../models');
const StatusMessage = require('../Constants/statusMessages');
const StatusCode = require('../Constants/statusCode');

module.exports.getAvaliableRssSites = async () => {

    try {
        let rssSiteList = await RssSite.findAll();
        let response = { message: StatusMessage.Fetch_Available_Rss_Sites, statusCode: StatusCode.Success, rssSubscriptions: rssSiteList};
        return response;
        
    } catch (error) {
        let response = { message: error, statusCode: 500 };
        return response;
    }
}