var app = require('bull-ui/app')({
  redis: {
    host: "127.0.0.1",
    port: 6379,
  }
});

module.exports.initBullUi = () => {

  app.listen(1337, function () {
    console.log('bull-ui started listening on port', this.address().port);
  });
}

