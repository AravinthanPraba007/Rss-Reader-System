const Hapi = require('hapi');
const Path = require('path');
const AuthJwt = require('hapi-auth-jwt2');
const UserHelper = require('../Helpers/userHelper');

const AuthRouters = require('../Routers/authRouters');
const RssSubscriptionRouters = require('../Routers/rssSubscriptionRouters');
const RssSiteRouters = require('../Routers/rssSiteRouter');
const FeedsRouters = require('../Routers/feedsRouters');

const BullUi = require('../Jobs/bullUi');
const { triggerFeedFetchJob } = require('../Jobs/queues/fetchFeedsQueue');
const { elasticSearchHealth, elasticSearchPing } = require('../ElasticSearch/elasticsearchHelper');

// Configure the server to start the host and port
const server = new Hapi.Server();
server.connection({
  port: 8080,
  host: 'localhost',
  routes: {
    cors: {
      origin: ['*']
    },
    files: {
      relativeTo: Path.join(__dirname, '')
    }
  }
});


function addRoutersToServer(routers, routerName) {
  routerName ? console.log(`--- Adding ${routerName} ---`) : console.log(`--- Adding Roter ---`)
  routers.forEach((route) => {
    console.log(`End point: ${route.path}`);
    server.route(route);
  })
}

const validate = async function (decoded, request, callback) {
  let validUser = UserHelper.isUserIdExist(decoded.userId)
  if (!validUser) {
    return callback(null, false);
  }
  else {
    return callback(null, true);
  }
};

function checkElasticSearchHealth() {
  elasticSearchPing()
  elasticSearchHealth();
}

function startBullJobs() {
  triggerFeedFetchJob();
}

const serverInit = async () => {

  await server.register(AuthJwt);
  server.auth.strategy('jwt', 'jwt',
    {
      key: 'jksdfghreasdopujnbertujsdfgrwer',
      validateFunc: validate,
      verifyOptions: { algorithms: ['HS256'] }
    });

  server.auth.default('jwt');

  addRoutersToServer(AuthRouters, "Auth Routers");
  addRoutersToServer(RssSubscriptionRouters, "RssSubscription Routers");
  addRoutersToServer(RssSiteRouters, "RssSite Routers");
  addRoutersToServer(FeedsRouters, "Feed Routers");

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);

};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
})

serverInit();
startBullJobs();
checkElasticSearchHealth();