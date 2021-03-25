const Joi = require('@hapi/joi');
const postController = require('../controllers/post');

module.exports = [
  {
    method: 'POST',
    path: '/post',
    handler: postController.addPost,
    config: {
      auth: false,
      description: 'Add post',
      notes: ['API for user add post'],
      tags: ['api', 'internal'],
      validate: {
        query: Joi.object({
          userId: Joi.string().required(),
        }),
        payload: Joi.object({
          imageURLs: Joi.array().items(Joi.string()).min(1),
          caption: Joi.string().allow(''),
        }),
      },
    },
  },
];
