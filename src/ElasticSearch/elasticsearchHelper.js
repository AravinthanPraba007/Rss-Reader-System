const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({ hosts: 'http://localhost:9200' })

module.exports.client = client;

module.exports.elasticSearchHealth = async function () {
    client.cluster.health({}, function (err, resp, status) {
        console.log("-- Client Health --", resp);
    });
}


module.exports.elasticSearchPing = async function () {
    client.ping({}, function (err, resp, status) {
        console.log("-- Client PING --", resp);
    });
}