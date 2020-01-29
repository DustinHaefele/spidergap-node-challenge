//This will work well in almost all cases.
//It's downfall is that it will have a different prototype and
//won't copy property descriptors.
function deepCopy(obj) {
  let copiedObj = {};

  for (let key in obj) {
    if (Array.isArray(obj[key])) {
      copiedObj[key] = [];
      obj[key].forEach(val => copiedObj[key].push(val));
      //recursively copies objects within the object to ensure it is a deep copy
      //and not just pointing to the object within the original object.
    } else if (typeof obj[key] === 'object') {
      copiedObj[key] = deepCopy(obj[key]);
    } else {
      copiedObj[key] = obj[key];
    }
  }
  return copiedObj;
}

//Another way to do it if you know that your objects won't have any user defined methods.
deepCopyTwo = obj => JSON.parse(JSON.stringify(obj));

testObj = {
  a: 1,
  b: 'b',
  array: [1, 2, 3, 4],
  c: {
    d: 'hello world',
    e: 5,
    f: () => 'hello'
  },
  g: () => 'goodbye'
};

module.exports = {
  deepCopy,
  deepCopyTwo
};
