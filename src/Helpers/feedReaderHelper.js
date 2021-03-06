const feedRead = require("davefeedread");

module.exports.rssParser = async (rssFeedUrl) => {
    const timeOutSecs = 30;
    return new Promise(function (resolve, reject) {
        try {
            feedRead.parseUrl(rssFeedUrl, timeOutSecs, function (err, theFeed) {
                if (err) {
                    console.log(err);
                    const errorResponse = {
                        message: err.message
                    }
                    resolve(errorResponse);
                }
                else {
                    const sucessResponse = {
                        statusCode: 200,
                        content: theFeed
                    }
                    resolve(sucessResponse)
                }
            });
        } catch (error) {
            reject(error);
        }
    });


}