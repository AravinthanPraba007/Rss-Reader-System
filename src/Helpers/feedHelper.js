const FeedParser = require('./feedReaderHelper');
const { RssSite, RssFeed } = require('../../models');
const StatusMessage = require('../Constants/statusMessages');

module.exports.storeFeed = async function (rssSite, rssFetchData) {

    try {
        let response = {
            isFeedsStored: false
        }
        if (rssSite) {
            let fetchRequired = feedsFetchRequired(rssSite.lastFeedFetchedAt);
            if (fetchRequired) {
                if (rssFetchData && rssFetchData.statusCode && rssFetchData.statusCode === 200) {
                    let rssHeadDetails = rssFetchData.content.head;
                    if(rssSite.pubDate){
                       if(rssHeadDetails.pubDate > rssSite.pubDate) {
                        response.isFeedsStored = true;
                        // response.message = "No new feed Published, try after some time"
                        response.message = StatusMessage.FeedFetch_No_New_Feed_published;
                        return response;
                       }
                    }
                    /**
                     * 1. Store rss_id, title, link, description, summary, guid, pubDate in rss_feed
                     * 2. Update the lastFeedFetchedAt, lastPubDate in rss_site
                     */
                    const rssSiteId = rssSite.id;
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
                    const createdFeeds = await RssFeed.bulkCreate(latestFeeds);

                    const latestFeedFetchedAt = new Date();
                    const lastestPubDate = rssHeadDetails.pubDate;
                    const updatedRssSite = await RssSite.update({lastFeedFetchedAt: latestFeedFetchedAt, lastPubDate:lastestPubDate }, {
                        where: {
                            id: rssSite.id
                        }
                    });
                    response.isFeedsStored = true;
                    // response.message = " Rss feeds fetched and stored successfully"
                    response.message = StatusMessage.FeedFetch_And_Stored_Success;
                    return response;
                }
                else {
                    response.message = rssFetchData;
                    return response;
                }
            }
            else {
                response.isFeedsStored = true;
                // response.message = "Fetch recently only done, try after some time";
                response.message = StatusMessage.FeedFetch_Done_Recently_Only;
                return response;
            }


        }
        else {
            // response.message = "Without rss Site details We cant fetch the feeds";
            response.message = StatusMessage.FeedFetch_Without_RssSiteDetails_Error;
            return response;
        }
    } catch (error) {
        throw new Error(error);
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