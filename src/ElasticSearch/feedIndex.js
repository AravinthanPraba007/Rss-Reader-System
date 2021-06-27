const ElasticSearchClient = require('./elasticsearchHelper');

const client = ElasticSearchClient.client;
async function search(searchText) {
    return new Promise(function (resolve, reject) {
        try {
            let responseData = {
                isSearchDone: false,
            }
            client.search({
                index: 'rssfeeds',
                type: 'doc',
                body: {
                    "query": {
                        "match": {
                            "description": searchText
                        }
                    }
                }
            }, function (error, response, status) {
                if (error) {
                    console.log("search error: " + error)
                    responseData.data = error;
                    resolve(responseData);
                }
                else {
                    console.log("--- Response ---");
                    console.log(response);
                    console.log("--- Hits ---");
                    let searchResults = [];
                    response.hits.hits.forEach(function (hit) {
                        console.log(hit._source);
                        searchResults.push(hit._source);
                    });
                    responseData.isSearchDone = true;
                    responseData.data = searchResults;
                    resolve(responseData);
                }
            });
        } catch (error) {
            reject(error);
        }
    })

}
async function addValues(bulkData) {
    client.bulk({
        index: 'rssfeeds',
        type: '_doc',
        body: bulkData
    }, function (err, resp) {
        if (resp) {
            console.log(resp);
        }
        if (resp.errors) {
            console.log(JSON.stringify(resp, null, '\t'));
        }
        if (err) {
            console.log(err);
        }
    });

}

module.exports.searchFeed = search;
module.exports.addFeeds = addValues;