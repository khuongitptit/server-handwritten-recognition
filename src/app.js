const _ = require('lodash');
const config = require('config');
const Hapi = require('@hapi/hapi');

const routes = require('./routes');
const db = require('./db');
const path = require('path');
const server = Hapi.server({
  port: config.get('PORT') || 8080,
  host: 'localhost',
  routes: {
    cors: {
      origin: ['*'],
    },
    files: {
      relativeTo: path.join(__dirname, 'static'),
    },
  },
});
const init = async () => {
  await Promise.all([
    db.init(),
    server.register([
      {
        plugin: require('@hapi/inert'),
      },
      {
        plugin: require('@hapi/vision'),
      },
    ]),
    server.route(routes),
  ]);
  await server.start();
  console.log('Server running at: ', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
