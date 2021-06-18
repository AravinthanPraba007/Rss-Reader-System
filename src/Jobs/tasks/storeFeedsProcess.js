
const FeedParser = require('../../Helpers/feedReaderHelper');
const { RssSite, RssFeed, sequelize } = require('../../../models');
const { QueryTypes } = require('sequelize');

module.exports.storeFeedsProcessor = async (job,done) => {
    console.log("Executing store feeds job");
    console.log(job.data);
    let rssSite = job.data;
    if(rssSite && rssSite.url && rssSite.id) {
        let data = await doFetchAndStoreFeed(rssSite);
        console.log(data);
    }
    else {
        console.log("Proper Rss detail is not present");
    }
    console.log(new Date());
    done();
    
}

async function doFetchAndStoreFeed(rssSite) {
    let response = {
        message: ''
    };
    try {
        let rssFetchData = await FeedParser.rssParser(rssSite.url);
        if (rssFetchData.statusCode && rssFetchData.statusCode === 200) {
            let rssHeadDetails = rssFetchData.content.head;
            if(isNaN((rssHeadDetails.pubDate).getTime())) {
                rssHeadDetails.pubDate = null
            }
                if(rssSite.lastPubDate){
                    console.log("head pubDate "+rssHeadDetails.pubDate);
                    console.log("rss pubDate "+new Date(rssSite.lastPubDate));
                    if(rssHeadDetails.pubDate <= new Date(rssSite.lastPubDate)) {
                        response.message= "No new feed Published";
                        const latestFeedFetchedAt = new Date();
                        const updatedRssSite = await RssSite.update({lastFeedFetchedAt: latestFeedFetchedAt }, {
                            where: {
                                id: rssSite.id
                            }
                        });
                        return response;
                       }
                }
                    const rssSiteId = rssSite.id;
                    const rssFeedItemsDetails = rssFetchData.content.items;
                    const latestFeeds = rssFeedItemsDetails.map((item)=> {
                        if(isNaN((item.pubDate).getTime())) {
                            item.pubDate = null
                        }
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
                    const createdFeeds = await RssFeed.bulkCreate(latestFeeds, { ignoreDuplicates: true });

                    const latestFeedFetchedAt = new Date();
                    const lastestPubDate = rssHeadDetails.pubDate;
                    const updatedRssSite = await RssSite.update({lastFeedFetchedAt: latestFeedFetchedAt, lastPubDate:lastestPubDate }, {
                        where: {
                            id: rssSite.id
                        }
                    });
                    response.message = "Added Feeds Sucessfully";
                    return response;
        }
        else {
            response.message = "Feed parser result did not produce 200 Status code";
            return response;
           
        }
    } catch (error) {
        console.log(error);
    }
}
