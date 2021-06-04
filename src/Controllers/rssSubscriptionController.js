const AddRssSubscription = require('../Services/addRssSubscriptionService');

module.exports.AddRssSubscription =  async (user, reply) => {
    let data = await AddRssSubscription.addRssSubcription(user);
    if (data.statusCode === 200) {
        var response = reply({ message : data.message, data : data.content});
        response.code(data.statusCode);
        response.header('Authorization', data.jwtToken);
        return response;
    } else {
        return reply({ message: data.message}).code(data.statusCode);  
    }
}