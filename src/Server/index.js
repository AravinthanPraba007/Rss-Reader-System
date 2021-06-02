const Hapi = require('hapi');
const AuthRouters = require('../Routers/auth-routers');
const server = new Hapi.Server();

// Configure the server to start the host and port
server.connection({
    port: 8080,
    host: 'localhost',
  });

  const init = async () => {
    
    // server.route([...AuthRouters]);
    AuthRouters.forEach((route) => {
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