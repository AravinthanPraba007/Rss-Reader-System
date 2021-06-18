const { RssSite, RssFeed, sequelize } = require('../../../models');
const { QueryTypes } = require('sequelize');
const { triggerFeedStoreJob } = require('../queues/storeFeedsQueue');

module.exports.fetchFeedsProcessor = async (job,done) => {
    console.log("Executing the fetch feeds job");
    console.log(job);
    let response = {
        isFetchAndStoreDone: false,
        errorMessage : [],
        sucessMessage : []
    }
    let rssSiteResults  = [];
        rssSiteResults = await sequelize.query('SELECT id, url,"lastFeedFetchedAt", "lastPubDate", "feedFetchFrequency" FROM rss_site', {
            type: QueryTypes.SELECT 
          });
          for(let index =0; index < rssSiteResults.length; index++) {
            let rssSite = rssSiteResults[index];

            if (rssSite) {
                let fetchRequired = feedsFetchRequired(rssSite.lastFeedFetchedAt, rssSite.feedFetchFrequency);
                let data = rssSite;
                // console.log("Rss ID : "+rssSite.id);
                if (fetchRequired) {
                    response.sucessMessage.push(`${rssSite.url} -id:- ${rssSite.id} -- Fetch Tigger Done`)
                    triggerFeedStoreJob(data);
                    continue;
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
    console.log(response);
    console.log(new Date());
    done();
    
}


function feedsFetchRequired(lastFeedFetchedAt, fetchFrequency) {
    try {
        if(lastFeedFetchedAt){
            
            let currentTime = new Date();
            let nextFetchRequired = new Date(lastFeedFetchedAt);
            nextFetchRequired.setMinutes(nextFetchRequired.getMinutes() + fetchFrequency);
            // console.log("lastFeedFetchedAt : "+lastFeedFetchedAt);
            // console.log("nextFetchRequired : "+nextFetchRequired);
            // console.log("Current time : "+ currentTime);
            if(nextFetchRequired > currentTime) {
                return false;
            }
        }

        return true;
       
    } catch (error) {
        throw new Error(error);
    }
}