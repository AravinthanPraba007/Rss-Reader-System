
const FeedParser = require('../Helpers/feedReaderHelper');
const { User, RssSite, UserRssSubscription } = require('../../models');
const StatusMessage = require('../Constants/statusMessages');

const FeedParser2 = require('../Helpers/feedReaderHelper2');

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
            rssFetchData = await FeedParser.rssParser(userData.rssFeedUrl);
            if (rssFetchData.statusCode && rssFetchData.statusCode === 200) {
                let newRssDetails = {};
                newRssDetails.rssFeedUrl = userData.rssFeedUrl;
                if (rssFetchData.content && rssFetchData.content.head) {
                    if (rssFetchData.content.head.title)
                        newRssDetails.title = rssFetchData.content.head.title;
                    if (rssFetchData.content.head.description)
                        newRssDetails.description = rssFetchData.content.head.description;
                    if (rssFetchData.content.head.link)
                        newRssDetails.siteLink = rssFetchData.content.head.link;
                    if (rssFetchData.content.head.image && rssFetchData.content.head.image.url)
                        newRssDetails.imageUrl = rssFetchData.content.head.image.url;
                }
                let savedRssSite = await RssSite.create({
                    url: userData.rssFeedUrl,
                    title: newRssDetails.title,
                    description: newRssDetails.description,
                    siteLink: newRssDetails.siteLink,
                    imageUrl: newRssDetails.imageUrl
                });
                rssSiteId = savedRssSite.dataValues.id;
            }
            else {
                response.message = rssFetchData.errorMessage;
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


