const ElasticSearchClient = require('./elasticsearchHelper');

const client = ElasticSearchClient.client;
async function search() {
    client.search({
        index: 'rssFeeds',
        type: '_doc',
        body: {
            query: {
                wildcard: { "description": "car" }
            },
        }
    }, function (error, response, status) {
        if (error) {
            console.log("search error: " + error)
        }
        else {
            console.log("--- Response ---");
            console.log(response);
            console.log("--- Hits ---");
            response.hits.hits.forEach(function (hit) {
                console.log(hit);
            })
        }
    });
}
async function addValues(bulkData) {
    client.bulk({
        index: 'rssfeeds',
        type: '_doc',
        body:  bulkData
    }, function (err, resp) {
        if(resp) {
            console.log(resp);
        }
        if(resp.errors) {
           console.log(JSON.stringify(resp, null, '\t'));
        }
        if(err) {
            console.log(err);
        }
    });

}

module.exports.searchFeed = search;
module.exports.addFeeds = addValues;