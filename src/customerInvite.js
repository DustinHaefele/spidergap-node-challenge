const fs = require('fs');


let data = fs.readFileSync('./partners.json')
let partners = JSON.parse(data);


function findDistance(coordString) {

  const londLat = 51.515419 * Math.PI / 180;
  const londLong = -0.141099 * Math.PI / 180;
  let coorArray = coordString.split(',').map(coor => parseFloat(coor));
  const custLat = coorArray[0] * Math.PI / 180;
  const custLong = coorArray[1] * Math.PI / 180;
  const centerAngle = (Math.acos((Math.sin(custLat)*Math.sin(londLat))+(Math.cos(custLat)*Math.cos(londLat)*Math.cos(Math.abs(custLong - londLong)))));

  return centerAngle * 6371;

}

console.log(findDistance("-33.8934219,151.20404600000006"));





