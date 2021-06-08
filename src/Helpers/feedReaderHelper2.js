// Currently not using this rss parser 
let Parser = require('rss-parser');
let parser = new Parser();

module.exports.rssParser = async function (feedUrl) {
    let feed = await parser.parseURL(feedUrl);
    return feed;
}