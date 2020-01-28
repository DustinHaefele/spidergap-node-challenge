const fs = require('fs');

let data = fs.readFileSync('./partners.json');
let partners = JSON.parse(data);

function findDistance(coordString) {
  const londLat = (51.515419 * Math.PI) / 180;
  const londLong = (-0.141099 * Math.PI) / 180;
  let coorArray = coordString.split(',').map(coor => parseFloat(coor));
  const partnerLat = (coorArray[0] * Math.PI) / 180;
  const partnerLong = (coorArray[1] * Math.PI) / 180;
  const centerAngle = Math.acos(
    Math.sin(partnerLat) * Math.sin(londLat) +
      Math.cos(partnerLat) *
        Math.cos(londLat) *
        Math.cos(Math.abs(partnerLong - londLong))
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
    } else {
      return 1;
    }
  });

  return invitedPartner;
}

console.log(findPartners(partners));
