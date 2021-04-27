const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const Feature = require('../models/Feature');
const Boom = require('@hapi/boom');
const extractHOG = require('./extractHOG');
const imgDirPath = '../server-handwritten-recognition/images';

async function updateSammple() {
  const imageDirectory = path.resolve(imgDirPath);
  fs.readdir(imageDirectory, (err, directories) => {
    directories.forEach(directoryName => {
      const directory = path.resolve(imgDirPath +"/"+ directoryName);
      fs.readdir(directory, (err, fileNames) => {
        Promise.all(fileNames.map(async fileName => {
          const file = path.join(directory, fileName);
          const descriptor = await extractHOG(file);
          const featureVector = {
            label: directoryName,
            featureData: descriptor
          }
          return featureVector;
        })).then(dataBatch => {
          console.log(directoryName,dataBatch);
          return Feature.insertMany(dataBatch);
        }).catch(err => {
          console.log("err",err);
        })
      });
    });
  });
  // const file = imageDirectory+"/a/hsf_0_00009.png";
  // Image.load(file).then(image => {
  //   const descriptor = hog.extractHOG(image, {cellSize: 8, blockSize: 4, bins: 9});
  //   console.log("descriptor",descriptor);
  // });
  return 'ok';
}

module.exports = {
  updateSammple,
};
