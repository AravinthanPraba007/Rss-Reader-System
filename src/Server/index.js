const Hapi = require('hapi');
const AuthRouters = require('../Routers/authRouters');
const RssSubscriptionRouters = require('../Routers/rssSubscriptionRouters');
const RssSiteRouters = require('../Routers/rssSiteRouter');
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


/**
  try {
    serverAdapter.setBasePath('/ui');
    const bullBoardRegister = serverAdapter.registerPlugin().register;
    bullBoardRegister.attributes = {
      version: '3.2.8',
      name: '@bull-board/hapi',
    };
    const bullBoardPlugin = {
      register: bullBoardRegister,
    };

    console.log("-------");
    console.log(bullBoardPlugin);
    // console.log(serverAdapter);
    console.log("-------");
    // console.log(serverAdapter.registerPlugin().register);
    // console.log("-------");
    server.register(bullBoardPlugin, () => {
      console.log("okay");
    });
  } catch (error) {
    console.log(error);
  }

   */

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

