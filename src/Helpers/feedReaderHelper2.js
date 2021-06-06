let Parser = require('rss-parser');
let parser = new Parser();

module.exports.parserHelper = async function (feedUrl) {
    let feed = await parser.parseURL(feedUrl);
    return feed;
//   console.log(feed);
//   feed.items.forEach(item => {
//     console.log(item.title + ':' + item.link)
//   });
}