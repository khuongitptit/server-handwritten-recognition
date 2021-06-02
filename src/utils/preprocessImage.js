// const cv = require('../lib/opencv');
const _ = require('lodash');
const { createCanvas, loadImage } = require('canvas');
const preprocessImage = async (cv, file) => {
  const image = await loadImage(file);
  let src = cv.imread(image);
  let dst = new cv.Mat();
  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0); //convert to rgb color
  cv.adaptiveThreshold(src, dst, 255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 15, 2); // convert to black-white
  src.delete();
  //show noise-reduction image=============================================================
  let src2 = dst;
  let dst2 = new cv.Mat();
  let ksize = new cv.Size(1, 1);
  cv.GaussianBlur(src2, dst2, ksize, 0, 0, cv.BORDER_DEFAULT);
  src2.delete();
  // //show ROI extraction image=============================================================
  let src3 = dst2;
  // cv.cvtColor(src3, src3, cv.COLOR_RGBA2GRAY, 0); //convert to rbg color
  cv.threshold(src3, src3, 170, 255, cv.THRESH_BINARY);
  let contours = new cv.MatVector();
  let hierarchy = new cv.Mat();
  cv.findContours(src3, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
  let points = []; //get coordinates of contour
  for (let i = 0; i < contours.size(); i++) {
    const ci = contours.get(i);
    points[i] = [];
    for (let j = 0; j < ci.data32S.length; j += 2) {
      let p = {};
      p.x = ci.data32S[j];
      p.y = ci.data32S[j + 1];
      points[i].push(p);
    }
  }
  const coutourData = _.maxBy(points, contour => _.size(contour)); //find coordinates of top-left and bottom-right corners
  const minX = _.minBy(coutourData, coord => coord.x);
  const maxX = _.maxBy(coutourData, coord => coord.x);
  const minY = _.minBy(coutourData, coord => coord.y);
  const maxY = _.maxBy(coutourData, coord => coord.y);
  const topLeft = { x: minX.x, y: minY.y };
  const bottomRight = { x: maxX.x, y: maxY.y };
  let dst3 = src3.roi(new cv.Rect(topLeft.x, topLeft.y, bottomRight.x - topLeft.x, bottomRight.y - topLeft.y)); //crop image
  src3.delete();
  contours.delete();
  hierarchy.delete();
  // //show resized output image============================================================================
  let src4 = dst3;
  let dst4 = new cv.Mat();
  let dsize = new cv.Size(64, 64);
  cv.resize(src4, dst4, dsize, 0, 0, cv.INTER_AREA);
  const canvas = createCanvas();
  cv.imshow(canvas, dst4);
  src4.delete();
  dst4.delete();
  return canvas.toDataURL(); //return preprocess image in base64
};
module.exports = {
  preprocessImage,
};
