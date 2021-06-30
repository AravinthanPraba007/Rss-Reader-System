const redis = require('redis');
const client = redis.createClient();

module.exports.redisHealthCheck = async function () {
    client.on('ready', function () {
        console.log('Redis ready');
    }).on('error', function (err) {
        console.log('Redis error', err);
    });
}

module.exports.client = client;