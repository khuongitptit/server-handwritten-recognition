const Joi = require('@hapi/joi');
const profileController = require('../controllers/profile');
const {authorization} = require('../services/authorization');

module.exports = [
  {
    method: 'GET',
    path: '/profile',
    handler: profileController.searchProfile,
    config: {
      auth: false,
      description: 'Search user profile',
      notes: ['API for user search other users profile'],
      tags: ['api', 'internal'],
      validate: {
        query: Joi.object({
          userId: Joi.string().required(),
          keyword: Joi.string().required()
        }),
      },
      pre:[{
        method: authorization,
        assign:'isAuth'
      }]
    },
  },
];
