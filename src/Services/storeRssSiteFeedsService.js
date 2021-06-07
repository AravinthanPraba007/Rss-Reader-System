
const FeedParser = require('../Helpers/feedReaderHelper');
const { RssSite, RssFeed } = require('../../models');

module.exports.storeRssSiteFeeds = async function (rssFeedUrl) {

    try {
        let response = {
            isFeedsStored: false
        }
        let data = await fetchAndStoreFeed(rssFeedUrl);
        response.message = data.message;
        if(data.isFetchAndStoreDone) {
            response.isFeedsStored = true;
            return response;
        }
        else{
            return response;
        }
    } catch (error) {
        throw error;
    }
}


function feedsFetchRequired(lastFeedFetchedAt) {
    try {
        const fetchFrequency = 60;
        if(lastFeedFetchedAt){
            
            let currentTime = new Date();
            let nextFetchRequired = new Date(lastFeedFetchedAt);
            nextFetchRequired.setMinutes(nextFetchRequired.getMinutes() + fetchFrequency);
            
            if(nextFetchRequired > currentTime) {
                return false;
            }
        }

        return true;
       
    } catch (error) {
        throw new Error(error);
    }
}

async function fetchAndStoreFeed(rssFeedUrl) {
    try {
        let response = {
            isFetchAndStoreDone: false
        }
        let rssSite = await RssSite.findOne({
            where: {
                url: rssFeedUrl
            }
        });
        if (rssSite) {
            let fetchRequired = feedsFetchRequired(rssSite.dataValues.lastFeedFetchedAt);
            if (fetchRequired) {
                let rssFetchData = await FeedParser.rssParser(rssFeedUrl);
                if (rssFetchData.statusCode && rssFetchData.statusCode === 200) {
                    let rssHeadDetails = rssFetchData.content.head;
                    if(rssSite.dataValues.pubDate){
                       if(rssHeadDetails.pubDate > rssSite.dataValues.pubDate) {
                        response.isFetchAndStoreDone = true;
                        response.message = "No new feed Published, try after some time"
                        return response;
                       }
                    }
                    /**
                     * 1. Store rss_id, title, link, description, summary, guid, pubDate in rss_feed
                     * 2. Update the lastFeedFetchedAt, lastPubDate in rss_site
                     */
                    const rssSiteId = rssSite.dataValues.id;
                    const rssFeedItemsDetails = rssFetchData.content.items;
                    const latestFeeds = rssFeedItemsDetails.map((item)=> {
                        return {
                            rss_id: rssSiteId,
                            title: item.title,
                            description: item.description,
                            link: item.link,
                            summary: item.summary,
                            guid: item.guid,
                            pubDate: item.pubDate
                        };
                        
                    })
                    console.log(latestFeeds[0]);
                    const createdFeeds = await RssFeed.bulkCreate(latestFeeds);
                    console.log(createdFeeds);

                    const latestFeedFetchedAt = new Date();
                    const lastestPubDate = rssHeadDetails.pubDate;
                    const updatedRssSite = await RssSite.update({lastFeedFetchedAt: latestFeedFetchedAt, lastPubDate:lastestPubDate }, {
                        where: {
                            id: rssSite.dataValues.id
                        }
                    });
                    response.isFetchAndStoreDone = true;
                    response.message = "Fetched"
                    return response;
                }
                else {
                    response.message = rssFetchData;
                    return response;
                }
            }
            else {
                response.isFetchAndStoreDone = true;
                response.message = "Fetch recently only done, try after some time"
                return response;
            }


        }
        else {
            response.message = "Given rss link not registered in the system";
            return response;
        }
    } catch (error) {
        throw new Error(error);
    }
}