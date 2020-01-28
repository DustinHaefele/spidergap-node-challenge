const fs = require('fs');




fs.readFile('./partners.json', (err, data) => {
  if (err) throw err;
  let partners = JSON.parse(data);
  console.log(partners);
});