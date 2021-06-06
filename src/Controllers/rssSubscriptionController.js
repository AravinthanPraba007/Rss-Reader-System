const AddRssSubscription = require('../Services/addRssSubscriptionService');
const RssSubscriptionList = require('../Services/rssSubscriptionListService');
const JwtHelper = require('../Helpers/jwtTokenHelper');

module.exports.AddRssSubscription =  async (request, reply) => {
    const decoded = JwtHelper.tokenVerifyDecoder(request.headers.authorization);
    console.log(decoded);
    let user = {
        rssFeedUrl: request.payload.rssFeedUrl,
        userId: decoded.userId
    }
    let data = await AddRssSubscription.addRssSubcription(user);
    if (data.statusCode === 200) {
        var response = reply({ message : data.message, data : data.content});
        response.code(data.statusCode);
        return response;
    } else {
        return reply({ message: data.message}).code(data.statusCode);  
    }
}

module.exports.GetRssSubscriptionList =  async (request, reply) => {
    const decoded = JwtHelper.tokenVerifyDecoder(request.headers.authorization);
    console.log(decoded);
    const user = {
        userId : decoded.userId
    }
    let data = await RssSubscriptionList.getRssSubscriptionList(user);
    if (data.statusCode === 200) {
    return reply({ message: data.message, subcriptionList: data.rssSubscriptions}).code(200); 
    } else{
        return reply({ message: data.message}).code(data.statusCode);  
    }
    
}