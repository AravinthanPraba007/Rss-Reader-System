
const { RssSite } = require('../../models');
const StatusMessage = require('../Constants/statusMessages');
const RssSiteHelper = require('../Helpers/rssSiteHelper');

module.exports.addRssSite = async (rssFeedUrl) => {
    try {
        let response  = {
            isRssSiteAdded : false
        }
        let rssUrlAlreadyExist = await isRssUrlExist(rssFeedUrl);
        if(rssUrlAlreadyExist){
            response.isRssSiteAdded = true;
            response.message = "Given Rss Url already present";
            return response;
        }
        else {
            let data = await RssSiteHelper.addNewRssSite(rssFeedUrl);
            if(data.isRssSiteStored) {
                response.isRssSiteAdded = true;
                response.message = "Rss site added successfully";
                return response;
            }
            else {
                response.message = data.message;
                return response;
            }
        }
    } catch (error) {
        return error
    }
}


async function isRssUrlExist(rssUrl) {
    try {
        let rssSite = await RssSite.findOne({
            where: {
                url: rssUrl
            }
        });
        if (rssSite) {
            return true;
        }
        return false;
    } catch (error) {
        return error;
    }
}