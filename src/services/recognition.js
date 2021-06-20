const _ = require('lodash');
const Feature = require('../models/Feature');
const euclideanDistance = require('euclidean-distance');
const extractHOG = require('./extractHOG');
async function recognize(img) {
  const descriptor = await extractHOG(img);
  return Feature.find({})
    .then(features => {
      let minEuclideanDistanceFeature = _.minBy(features, feature => {
        return euclideanDistance(descriptor, feature.featureData);
      });
      return {recognized: minEuclideanDistanceFeature, euclideanDistance: euclideanDistance(descriptor, minEuclideanDistanceFeature.featureData)};
    })
    .catch(err => {
      throw err;
    });
}

module.exports = {
  recognize,
};
