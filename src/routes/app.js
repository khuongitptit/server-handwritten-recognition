const Joi = require('@hapi/joi');
const appController = require('../controllers/app');
const {authorization} = require('../services/authorization');

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: appController.getAll,
    config: {
      auth: false,
      description: 'Get all app in4',
      tags: ['api', 'internal'],
      validate: {
        query: Joi.object({
          userId: Joi.string().required(),
        }),
      },
      pre:[{
        method: authorization,
        assign :'isAuth'
      }]
    },
  },
];
