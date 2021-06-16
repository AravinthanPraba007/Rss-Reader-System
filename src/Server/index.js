const Hapi = require('hapi');
const AuthRouters = require('../Routers/authRouters');
const RssSubscriptionRouters = require('../Routers/rssSubscriptionRouters');
const RssSiteRouters = require('../Routers/rssSiteRouter');
const RssSiteFeedRouters = require('../Routers/rssSiteFeedRouters');


const server = new Hapi.Server();
const AuthJwt = require('hapi-auth-jwt2');
const UserHelper = require('../Helpers/userHelper');
const { triggerJob, sampleQueue } = require('../Jobs/queues/sampleQueue');
const BullUi = require('../Jobs/bullUi');
var matador = require('bull-ui/app');

const { createBullBoard } = require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { HapiAdapter } = require('@bull-board/hapi');
const Path = require('path')
// Configure the server to start the host and port
server.connection({
  port: 8080,
  host: 'localhost',
  routes: {
    cors: {
      origin: ['*'] // an array of origins or 'ignore'           
    },
    files: {
      relativeTo: Path.join(__dirname, '')
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

  const serverAdapter = new HapiAdapter();

  createBullBoard({
    queues: [new BullMQAdapter(sampleQueue)],
    serverAdapter,
  });




  await server.register(AuthJwt);
  server.auth.strategy('jwt', 'jwt',
    {
      key: 'jksdfghreasdopujnbertujsdfgrwer',
      validateFunc: validate,
      verifyOptions: { algorithms: ['HS256'] }
    });
  server.auth.default('jwt');

  console.log("--- Adding Auth Routers ---");
  AuthRouters.forEach((route) => {
    console.log(`End point: ${route.path}`);
    server.route(route);
  })

  console.log("--- Adding RssSubscription Routers ---");
  RssSubscriptionRouters.forEach((route) => {
    console.log(`End point: ${route.path}`);
    server.route(route);
  })

  console.log("--- Adding RssSite Routers ---");
  RssSiteRouters.forEach((route) => {
    console.log(`End point: ${route.path}`);
    server.route(route);
  })

  console.log("--- Adding RssSiteFeed Routers ---");
  RssSiteFeedRouters.forEach((route) => {
    console.log(`End point: ${route.path}`);
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
BullUi.initBullUi();
triggerJob();

