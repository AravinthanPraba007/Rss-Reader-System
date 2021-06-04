
const FeedParser = require('../Helpers/feedReaderHelper');

module.exports.addRssSubcription = async (userData) => {
    try {
        const data = await FeedParser.parseExample(userData.rssFeedUrl);
        if(data.statusCode && data.statusCode === 200) {
            let response = { message : "Content Fetched Sucessfully", content: data.content, statusCode: 200};
            return response;
        }
        else{
            let response = { message : data.errorMessage, statusCode: 404};
            return response;
        }
                 
      } catch (error) {
         return error;
      } 
}