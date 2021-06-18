
const FeedParser = require('../../Helpers/feedReaderHelper');
const { RssSite, RssFeed, sequelize } = require('../../../models');
const { QueryTypes } = require('sequelize');

module.exports.feedStoreHelper = async function () {
    try {
        let response = {
            isFetchAndStoreDone: false,
            errorMessage : [],
            sucessMessage : []
        }
        let rssSiteResults  = [];
        rssSiteResults = await sequelize.query("SELECT * FROM rss_site", {
            type: QueryTypes.SELECT 
          });
        
        for(let index =0; index < rssSiteResults.length; index++) {
            console.log(rssSiteResults[index]);
            let rssSite = rssSiteResults[index];
       

        if (rssSite) {
            let fetchRequired = feedsFetchRequired(rssSite.lastFeedFetchedAt);
            if (fetchRequired) {
                let rssFetchData = await FeedParser.rssParser(rssSite.url);
                if (rssFetchData.statusCode && rssFetchData.statusCode === 200) {
                    let rssHeadDetails = rssFetchData.content.head;
                    if(rssHeadDetails.pubDate && rssHeadDetails.pubDate != 'Invalid Date') {
                    if(rssSite.pubDate){
                       if(rssHeadDetails.pubDate > rssSite.pubDate) {
                        response.sucessMessage.push(`${rssSite.url} -id:- ${rssSite.id} -- No new feed Published`);
                        continue;
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
                    continue;
                }
                else {
                    response.errorMessage.push(`${rssSite.url} -id:- ${rssSite.id} -- Feed parser result is not having pub date`) 
                    continue;
                }
            }
            else {
                response.errorMessage.push(`${rssSite.url} -id:- ${rssSite.id} -- Feed parser result did not produce 200 Status code`)
                    continue;
            }
            }
            else {
                response.errorMessage.push(`${rssSite.url} -id:- ${rssSite.id} -- Fetch recently only done, try after some time`)
                continue;
            }
        }
        else {
            response.errorMessage.push(`${rssSite.url} -id:- ${rssSite.id} -- Given rss link not registered in the system`)
            continue;
        }
    }
    response.isFetchAndStoreDone = true;
    return response;
    } catch (error) {
        console.log(error);
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