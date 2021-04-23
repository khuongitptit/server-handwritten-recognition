const _ = require('lodash');
const { Image } = require('image-js');
const hog = require('hog-features');
const Feature = require('../models/Feature');
const euclideanDistance = require('euclidean-distance');

async function recognize(img) {
  const image = await Image.load(img);
  const descriptor = hog.extractHOG(image, { cellSize: 32 });
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
