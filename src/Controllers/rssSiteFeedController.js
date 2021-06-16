const UserFeedService = require('../Services/userFeedService');
const JwtHelper = require('../Helpers/jwtTokenHelper');

const Boom = require('boom');

module.exports.getUserFeeds = async (request, reply) => {
    try {
        const decoded = JwtHelper.tokenVerifyDecoder(request.headers.authorization);
        console.log(decoded);
        let user = {
            page: request.payload.page,
            userId: decoded.userId
        }
        let data = await UserFeedService.getUserFeed(user);
        if(data.isUserFeedsFetched) {
            let  response = reply({ message: data.message, feeds: data.userFeeds });
            response.code(200);
            return response;
        }
        else {
            let  response = reply({ message: data.message });
            response.code(500);
            return response;
        }

    } catch (error) {
        console.log(error);
        return reply(Boom.boomify(error));
    }
}
