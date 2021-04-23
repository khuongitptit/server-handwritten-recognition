const _ = require('lodash');
const Boom = require('@hapi/boom');
const sample = require('./sample');
const recognition = require('./recognition');
const all = _.concat(sample, recognition);
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
