const fs = require('fs');

let data = fs.readFileSync('./partners.json');
let partners = JSON.parse(data);

function findDistance(coordString) {
  const londonLat = (51.515419 * Math.PI) / 180;
  const londonLong = (-0.141099 * Math.PI) / 180;

  let coordArray = coordString.split(',').map(coor => parseFloat(coor));
  const partnerLat = (coordArray[0] * Math.PI) / 180;
  const partnerLong = (coordArray[1] * Math.PI) / 180;

  const centerAngle = Math.acos(
    Math.sin(partnerLat) * Math.sin(londonLat) +
      Math.cos(partnerLat) *
        Math.cos(londonLat) *
        Math.cos(Math.abs(partnerLong - londonLong))
  );

  return centerAngle * 6371;
}

function findPartners(partnerArray) {
  let invitedPartner = [];
  partnerArray.forEach(partner => {
    for (let i = 0; i < partner.offices.length; i++) {
      if (findDistance(partner.offices[i].coordinates) <= 100) {
        invitedPartner.push({
          companyName: partner.organization,
          address: partner.offices[i].address
        });
      }
    }
  });
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

console.log(findPartners(partners));

module.exports = {
  findPartners,
  findDistance
};
