const ElasticSearchClient = require('./elasticsearchHelper');

const client = ElasticSearchClient.client;
async function search() {
    client.search({
        index: 'twitter',
        type: '_doc',
        body: {
            query: {
                wildcard: { "tweet": "car" }
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
async function addValues() {
    let dataBody = [
        {
            "id": 7,
            "name": "Rocky",
            "tweet": "Audi car tweet"
        },
        {
            "id": 8,
            "name": "Surali",
            "tweet": "Gun tweet"
        },
        {
            "id": 9,
            "name": "Surali",
            "tweet": "BMW car tweet"
        },
        {
            "id": 10,
            "name": "Surali",
            "tweet": "Hyndai car tweet"
        },
        {
            "id": 11,
            "name": "Surali",
            "tweet": "Jagur car tweet"
        }
    ];
    let bulkData = [];
    dataBody.forEach((data) => {
        bulkData.push( { "index": { _index: 'twitter', _type: '_doc',_id: data.id } });
        bulkData.push(data);
    });

    client.bulk({
        index: 'gov',
        type: 'constituencies',
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

module.exports.searchTwitter = search;
module.exports.adddToTwitter = addValues;