const fs = require('fs');

let data = fs.readFileSync('./partners.json');
let partners = JSON.parse(data);

function findDistance(coordString) {
  const londLat = (51.515419 * Math.PI) / 180;
  const londLong = (-0.141099 * Math.PI) / 180;
  let coorArray = coordString.split(',').map(coor => parseFloat(coor));
  const custLat = (coorArray[0] * Math.PI) / 180;
  const custLong = (coorArray[1] * Math.PI) / 180;
  const centerAngle = Math.acos(
    Math.sin(custLat) * Math.sin(londLat) +
      Math.cos(custLat) *
        Math.cos(londLat) *
        Math.cos(Math.abs(custLong - londLong))
  );

  return centerAngle * 6371;
}

function findCustomers(custArray) {
  let invitedCust = [];
  custArray.forEach(cust => {
    for (let i = 0; i < cust.offices.length; i++) {
      if (findDistance(cust.offices[i].coordinates) <= 100) {
        invitedCust.push({
          companyName: cust.organization,
          address: cust.offices[i].address
        });
      }
    }
  });
  invitedCust.sort((a, b) => {
    if (a.companyName < b.companyName) {
      return -1;
    } else {
      return 1;
    }
  });

  return invitedCust;
}

console.log(findCustomers(partners));
