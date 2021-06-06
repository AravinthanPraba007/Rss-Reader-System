const Hapi = require('hapi');
const AuthRouters = require('../Routers/authRouters');
const RssSubscriptionRouters = require('../Routers/rssSubscriptionRouters');
const server = new Hapi.Server();
const AuthJwt = require('hapi-auth-jwt2');

// Configure the server to start the host and port
server.connection({
  port: 8080,
  host: 'localhost',
});

const validate = async function (decoded, request, callback) {
  if (false) {
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

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);

};



process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
})

init();