
const FeedParser = require('../Helpers/feedReaderHelper');
const { User, RssSite, UserRssSubscription } = require('../../models');
const StatusMessage = require('../Constants/statusMessages');
const StatusCode = require('../Constants/statusCode');


module.exports.addRssSubcription = async (userData) => {
    // 1. Check the user id
    // 2. Check the rss url alreaddy enrolled in the system
    // 3. If new rss site try to fetch the rss site and store it in the rss db
    // 4. Check if already user subscribed to the rss site
    // 5. If not add the site to user subscription
    try {
        const validUser = await isUserIdExist(userData.userId);
        if (!validUser) {
            let response = { message: StatusMessage.Add_Rss_Subscription_Invalid_UserID, statusCode: StatusCode.Unauthorized };
            return response;
        }
        let rssFetchData;
        let rssIdAlreadyExist = await isRssIdExist(userData.rssFeedUrl);
        let rssSiteId;
        if (!rssIdAlreadyExist) {
            rssFetchData = await FeedParser.parseExample(userData.rssFeedUrl);
            if (rssFetchData.statusCode && rssFetchData.statusCode === StatusCode.Success) {
                let savedRssSite = await RssSite.create({ url: userData.rssFeedUrl });
                rssSiteId = savedRssSite.dataValues.id;
            }
            else {
                let response = { message: rssFetchData.errorMessage, statusCode: StatusCode.NotFound };
                return response;
            }
        }
        else {
            rssSiteId = rssIdAlreadyExist;
        }

        let isUserAlreadySubscribed = await isUserAlreadySubscribedRss(userData.userId, rssSiteId);
        if (!isUserAlreadySubscribed) {
            let savedSubscription = await UserRssSubscription.create({ rss_id: rssSiteId, user_id: userData.userId });
            console.log((savedSubscription));
            let response = { message: StatusMessage.Add_Rss_Subscription_Success_Message, statusCode: 200 };
            return response;
        }
        let response = { message: StatusMessage.Add_Rss_Subscription_Already_Subscribed_Message, statusCode: 200 };
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

async function isRssIdExist(rssUrl) {
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