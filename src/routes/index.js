const _ = require('lodash');
const Boom = require('@hapi/boom');
const auth = require('./auth');
const profile = require('./profile');
const app = require('./app');
const post = require('./post');
const all = _.concat(auth, profile, app, post);
normalizeHandlers(all);

function normalizeHandlers(_routes) {
  _routes.forEach(route => {
    const defaultHandler = route.handler;
    route.handler = async (request, h) => {
      try {
        const result = await defaultHandler(request, h);
        return _.isUndefined(result) ? null : result;
      } catch (err) {
        throw Boom.isBoom(err) ? err : new Boom(null, { data: err });
      }
    };
  });
}

module.exports = all;
