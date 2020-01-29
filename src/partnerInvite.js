const fs = require('fs');

let data = fs.readFileSync('./partners.json');
let partners = JSON.parse(data);

//Function to find the the distance between coordinates given as a string and the center of london.
//Coordinate pairs are formatted as a comma seperated string in the partner data.
function findDistance(coordString) {

  //Converting london coordinates to radians
  const londonLat = (51.515419 * Math.PI) / 180;
  const londonLong = (-0.141099 * Math.PI) / 180;

  //Extracting partner coordinates from the string and converting to radians
  let coordArray = coordString.split(',').map(coor => parseFloat(coor));
  const partnerLat = (coordArray[0] * Math.PI) / 180;
  const partnerLong = (coordArray[1] * Math.PI) / 180;

  //Using the formula to find the center angle
  const centerAngle = Math.acos(
    Math.sin(partnerLat) * Math.sin(londonLat) +
      Math.cos(partnerLat) *
        Math.cos(londonLat) *
        Math.cos(Math.abs(partnerLong - londonLong))
  );
  
  //Earths mean radius of 6371 times the center angle gives you the distance between the coordinate pairs
  return centerAngle * 6371;
}

//function to find the partners within 100km
function findPartners(partnerArray) {
  let invitedPartner = [];

  //looking at each individual partner
  partnerArray.forEach(partner => {
    //looking at all the offices for a partner and seeing if any are within 100km.
    for (let i = 0; i < partner.offices.length; i++) {
      if (findDistance(partner.offices[i].coordinates) <= 100) {
        //pushing just the data we need to the array that holds the partners
        invitedPartner.push({
          companyName: partner.organization,
          address: partner.offices[i].address
        });
      }
    }
  });
  //sorting the matching partners in ascending order
  invitedPartner.sort((a, b) => {
    if (a.companyName < b.companyName) {
      return -1;
    } else if (a.companyName > b.companyName) {
      return 1;
    } else {
      return 0;
    }
  });

  return invitedPartner;
}


module.exports = {
  findPartners,
  findDistance
};
