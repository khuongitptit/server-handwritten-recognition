const _ = require('lodash');
const Feature = require('../models/Feature');
const cosineDistance = require('compute-cosine-distance');
const extractHOG = require('./extractHOG');
async function recognize(img) {
  const descriptor = await extractHOG(img);
  return Feature.find({})
    .then(features => {
      let minCosineDistanceFeature = _.minBy(features, feature => {
        return cosineDistance(descriptor, feature.featureData);
      });
      return {recognized: minCosineDistanceFeature, cosineDistance: cosineDistance(descriptor, minCosineDistanceFeature.featureData)};
    })
    .catch(err => {
      throw err;
    });
}

module.exports = {
  recognize,
};
