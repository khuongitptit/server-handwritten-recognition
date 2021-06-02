const Joi = require('@hapi/joi');
const imageController = require('../controllers/image');
module.exports = [
  {
    method: 'POST',
    path: '/recognize',
    handler: imageController.recognize,
    config: {
      auth: false,
      description: 'Recognize a character by image',
      tags: ['api', 'internal'],
      validate: {
        payload: Joi.object().required()
      },
    },
  },
];
