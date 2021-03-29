const Joi = require('@hapi/joi');
const userAuth = require('../controllers/auth');

module.exports = [
  {
    method: 'POST',
    path: '/auth/login',
    handler: userAuth.authenticate,
    config: {
      auth: false,
      description: 'Authentication using email and password',
      notes: [
        'Authentication API for user using email and password with options',
      ],
      tags: ['api', 'internal'],
      validate: {
        payload: Joi.object({
          username: Joi.string().lowercase(),
          password: Joi.string(),
          // remember: Joi.boolean().default(false),
        }),
      },
    },
  },
  {
    method: 'POST',
    path: '/auth/signup',
    handler: userAuth.register,
    config: {
      auth: false,
      description: 'Register user using email and password',
      notes: [
        'Authentication API for user register using email and password with options',
      ],
      tags: ['api', 'internal'],
      validate: {
        payload: Joi.object({
          email: Joi.string().lowercase().required(),
          fullname: Joi.string().required(),
          username: Joi.string().required(),
          password: Joi.string().required(),
        }),
      },
    },
  },
  {
    method: 'POST',
    path: '/auth/update/{accountId}',
    handler: userAuth.updateAccount,
    config: {
      auth: false,
      description: 'Update account in4',
      notes: [
        'API for user update their account in4',
      ],
      tags: ['api', 'internal'],
      validate: {
        payload: Joi.object({
          birthday: Joi.object({
            date: Joi.number(),
            month: Joi.string(),
            year: Joi.number()
          }),
          avatarURL: Joi.string()
        }),
        params: Joi.object({
          accountId: Joi.string().required(),
        })
      },
    },
  },
  {
    method: 'POST',
    path: '/auth/verify-email/{accountId}',
    handler: userAuth.verifyEmail,
    config: {
      auth: false,
      description: 'Confirm user email',
      notes: ['Authentication API for user confirm email'],
      tags: ['api', 'internal'],
      validate: {
        params: Joi.object({
          accountId: Joi.string().required(),
        }),
        payload: Joi.object({
          activeCode: Joi.string().length(6).required()
        })
      },
    },
  },
];
