const imageController = require('../controllers/image');

module.exports = [
  {
    method: 'POST',
    path: '/update-sample',
    handler: imageController.updateSample,
    config: {
      auth: false,
      description: 'Update sample feature vector of sample image sets',
      notes: [
        'Update sample feature vector of sample image sets',
      ],
      tags: ['api', 'internal'],
    },
  },
];
