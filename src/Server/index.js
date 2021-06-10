const Hapi = require('hapi');
const AuthRouters = require('../Routers/authRouters');
const RssSubscriptionRouters = require('../Routers/rssSubscriptionRouters');
const RssSiteRouters = require('../Routers/rssSiteRouter');
const server = new Hapi.Server();
const AuthJwt = require('hapi-auth-jwt2');
const UserHelper = require('../Helpers/userHelper');

// Configure the server to start the host and port
server.connection({
  port: 8080,
  host: 'localhost',
  routes: {
    cors: {
        origin: ['*'] // an array of origins or 'ignore'           
    }
}
});

const validate = async function (decoded, request, callback) {
  let validUser = UserHelper.isUserIdExist(decoded.userId)
  if (!validUser) {
    return callback(null, false);
  }
  else {
    return callback(null, true);
  }
};

const init = async () => {

  await server.register(AuthJwt);
  server.auth.strategy('jwt', 'jwt',
    {
      key: 'jksdfghreasdopujnbertujsdfgrwer',
      validateFunc: validate,
      verifyOptions: { algorithms: [ 'HS256' ] }  
    });
  server.auth.default('jwt');

  // server.route([...AuthRouters]);
  AuthRouters.forEach((route) => {
    console.log(`Adding the end point: ${route.path}`);
    server.route(route);
  })

  RssSubscriptionRouters.forEach((route) => {
    console.log(`Adding the end point: ${route.path}`);
    server.route(route);
  })

  RssSiteRouters.forEach((route) => {
    console.log(`Adding the end point: ${route.path}`);
    server.route(route);
  })

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);

};



process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
})

init();