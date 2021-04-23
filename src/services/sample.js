const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const { Image } = require('image-js');
const hog = require('hog-features');
const Feature = require('../models/Feature');
const Boom = require('@hapi/boom');

const imgDirPath = '../server-handwritten-recognition/images';

async function updateSammple() {
  const imageDirectory = path.resolve(imgDirPath);
  fs.readdir(imageDirectory, (err, directories) => {
    directories.forEach(directoryName => {
      const directory = path.resolve(imgDirPath +"/"+ directoryName);
      fs.readdir(directory, async (err, fileNames) => {
        const dataBatch = await Promise.all(fileNames.map(async fileName => {
          const file = path.join(directory, fileName);
          const image = await Image.load(file);
          const descriptor = hog.extractHOG(image, { cellSize: 32 });
          const featureVector = {
            label: directoryName,
            featureData: descriptor
          }
          // console.log("feature",featureVector);
          return featureVector;
        }))
        console.log("aaaaaaaaaaaaaaaaaaaaa",dataBatch);
        Feature.insertMany(dataBatch);
      });
    });
  });
  // const file = imageFolder+"/1.jpg";
  // Image.load(file).then(image => {
  //   const descriptor = hog.extractHOG(image);
  //   console.log("descriptor",descriptor);
  // });
  return 'ok';
}

module.exports = {
  updateSammple,
};
