
const FeedParser = require('../Helpers/feedReaderHelper');
const { User, RssSite, UserRssSubscription } = require('../../models');
const StatusMessage = require('../Constants/statusMessages');
const RssSiteHelper = require('../Helpers/rssSiteHelper');

module.exports.addRssSubcription = async (userData) => {
    /*
    1. Check the rss url alreaddy enrolled in the system
    2. If new rss site try to fetch the rss site and store it in the rss db
    3. Check if already user subscribed to the rss site
    4. If not add the site to user subscription
    */
    try {
        let rssFetchData;
        let response  = {
            isSubscriptionSuccess : false
        }
        let rssIdAlreadyExist = await isRssUrlExist(userData.rssFeedUrl);
        let rssSiteId;
        if (!rssIdAlreadyExist) {
            let data = await RssSiteHelper.addNewRssSite(userData.rssFeedUrl);
            if(data.isRssSiteStored){
                if( data.rssSiteId) {
                    rssSiteId = data.rssSiteId;
                }
                else {
                    // response.message = "Rss site id not populated"
                    response.message = StatusMessage.AddRssSubscription_RssSiteId_Not_Populated_Error;
                    return response;
                }
            }
            else {
                response.message = data.message;
                return response;
            }
        }
        else {
            rssSiteId = rssIdAlreadyExist;
        }

        let isUserAlreadySubscribed = await isUserAlreadySubscribedRss(userData.userId, rssSiteId);
        if (!isUserAlreadySubscribed) {
            let savedSubscription = await UserRssSubscription.create({ rss_id: rssSiteId, user_id: userData.userId });
            response.isSubscriptionSuccess = true;
            response.message = StatusMessage.Add_Rss_Subscription_Success_Message;
            return response;
        }
        response.isSubscriptionSuccess = true;
        response.message = StatusMessage.Add_Rss_Subscription_Already_Subscribed_Message;
        return response;
    }
    catch (error) {
        return error;
    }
}

async function isUserIdExist(userId) {
    try {
        let user = await User.findOne({
            where: {
                id: userId
            }
        });
        if (user) {
            return true;
        }
        return false;
    } catch (error) {
        return error;
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
            return rssSite.id;
        }
        return false;
    } catch (error) {
        return error;
    }
}

async function isUserAlreadySubscribedRss(userId, rssId) {
    try {
        let userSubscription = await UserRssSubscription.findOne({
            where: {
                user_id: userId,
                rss_id: rssId
            }
        });
        if (userSubscription) {
            return true;
        }
        return false;
    } catch (error) {
        return error;
    }
}


