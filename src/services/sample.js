const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const Feature = require('../models/Feature');
const extractHOG = require('./extractHOG');
const { preprocessImage } = require('../utils/preprocessImage');
const { Canvas, Image, ImageData } = require('canvas');
const {JSDOM} = require('jsdom');
const imgDirPath = '../server-handwritten-recognition/HandWritingDataset';

async function updateSammple() {
  installDOM();
  await loadOpenCV();
  const imageDirectory = path.resolve(imgDirPath);
  fs.readdir(imageDirectory, (err, directories) => {
    directories.forEach(directoryName => {
      const directory = path.resolve(imgDirPath +"/"+ directoryName);
      fs.readdir(directory, (err, fileNames) => {
        Promise.all(fileNames.map(async fileName => {
          const file = path.join(directory, fileName);
          const processedImage = await preprocessImage(cv, file);
          const descriptor = await extractHOG(processedImage);
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
  // fs.readdir(imageDirectory, (err, directories) => {
  //   const directory = path.resolve(imgDirPath + '/' + directories[0]);
  //   fs.readdir(directory, async (err, fileNames) => {
  //     const file = path.join(directory, fileNames[0]);
  //     const preprocessedImage = await preprocessImage(file);
  //     console.log("proprocess",preprocessedImage);
  //   });
  // });
  return 'success';
}

function loadOpenCV() {
  return new Promise(resolve => {
    global.Module = {
      onRuntimeInitialized: resolve
    };
    global.cv = require('../lib/opencv');
  });
}
function installDOM() {
  const dom = new JSDOM();
  global.document = dom.window.document;
  global.Image = Image;
  global.HTMLCanvasElement = Canvas;
  global.ImageData = ImageData;
  global.HTMLImageElement = Image;
}

module.exports = {
  updateSammple,
};
