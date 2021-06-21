
const FeedParser = require('../Helpers/feedReaderHelper');
const { User, RssSite, UserRssSubscription } = require('../../models');
const StatusMessage = require('../Constants/statusMessages');
const RssSiteHelper = require('../Helpers/rssSiteHelper');

module.exports.addRssSubcriptionByUrl = async (userData) => {
    /*
    1. Check the rss url alreaddy enrolled in the system
    2. If new rss site try to fetch the rss site and store it in the rss db
    3. Check if already user subscribed to the rss site
    4. If not add the site to user subscription
    */
    try {
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
                    response.message = StatusMessage.RssSiteId_Not_Populated_Error;
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

        let userSubscriptionPresent = await isUserSubscriptionPresentwithSoftDelete(userData.userId, rssSiteId);
            if (userSubscriptionPresent) {
                if (userSubscriptionPresent.deletedAt) {
                    let savedSubscription = await UserRssSubscription.restore({
                        where: {
                            id: userSubscriptionPresent.id
                        }
                    })
                    response.isSubscriptionSuccess = true;
                    response.message = StatusMessage.Subscribe_Success;
                    return response;
                }
                else{
                response.isSubscriptionSuccess = true;
                response.message = StatusMessage.Add_Rss_Subscription_Already_Subscribed_Message
                return response;
                }
                
            }
            else {
                let savedSubscription = await UserRssSubscription.create({ rss_id: rssSiteId, user_id: userData.userId });
                response.isSubscriptionSuccess = true;
                response.message = StatusMessage.Subscribe_Success;
                return response;
            }
    }
    catch (error) {
        return error;
    }
}

module.exports.manageRssSubcription = async (userData) => {
    try {
        let response  = {
            isActionSuccess : false
        }

        if((userData.action) === 'subscribe') {
            if(!userData.rssId) {
                response.message = "Rss Site id is Required";
                return response;
            }
            let userSubscriptionPresent = await isUserSubscriptionPresentwithSoftDelete(userData.userId, userData.rssId);
            if (userSubscriptionPresent) {
                if (userSubscriptionPresent.deletedAt) {
                    let savedSubscription = await UserRssSubscription.restore({
                        where: {
                            id: userSubscriptionPresent.id
                        }
                    })
                    response.isActionSuccess = true;
                    response.message = StatusMessage.Subscribe_Success;
                    return response;
                }
                else{
                response.isActionSuccess = true;
                response.message = StatusMessage.Add_Rss_Subscription_Already_Subscribed_Message
                return response;
                }
                
            }
            else {
                let savedSubscription = await UserRssSubscription.create({ rss_id: userData.rssId, user_id: userData.userId });
                response.isActionSuccess = true;
                response.message = "Feed subscribed successfully";
                return response;
            }
        }
        else if((userData.action) === 'unsubscribe') {
            if(!userData.subscriptionId) {
                response.message = "Subscrption id is Required";
                return response;
            }
            let userSubscriptionPresent = await isUserSubscriptionPresent(userData.subscriptionId, userData.userId);
            if (userSubscriptionPresent) {
                let savedSubscription = await UserRssSubscription.destroy({
                    where: {
                        id: userData.subscriptionId
                    }
                })
                response.isActionSuccess = true;
                response.message = "Feed Unsubcribed Successfully";
                return response;
            }
            else {
                response.isActionSuccess = true;
                response.message = "User not subscribed to the Feed";
                return response;
            }
        }
        else {
            response.message = "Invalid Action requested";
            return response;
        }


        
    }
    catch (error) {
        console.log(error);
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

async function isUserSubscriptionPresentwithSoftDelete(userId, rssId) {
    try {
        let userSubscription = await UserRssSubscription.findOne({
            where: {
                user_id: userId,
                rss_id: rssId
            },
            paranoid: false
        });
        if (userSubscription) {
            return userSubscription.dataValues;
        }
        return false;
    } catch (error) {
        return error;
    }
}


async function isUserSubscriptionPresent(subscriptionId, userId) {
    try {
        let userSubscription = await UserRssSubscription.findOne({
            where: {
                id: subscriptionId,
                user_id: userId
            }
        });
        console.log(userSubscription);
        if (userSubscription) {
            return true;
        }
        return false;
    } catch (error) {
        return error;
    }
}