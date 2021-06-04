const feedRead = require ("davefeedread");

module.exports.parseExample = async (rssFeedUrl) => {
    const timeOutSecs = 30;
        return new Promise(function(resolve, reject){
        try{
         feedRead.parseUrl (rssFeedUrl, timeOutSecs, function (err, theFeed) {
            if (err) {
                console.log (err);
                const errorResponse = {
                    errorMessage : err.message
                }
                resolve(errorResponse);
                }
            else {
                console.log(theFeed.head);
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