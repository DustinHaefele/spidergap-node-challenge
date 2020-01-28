//This will work well in almost all cases. 
//It's downfall is that it will have a different prototype and 
//won't copy property descriptors.
function deepCopy(obj) {
  let copiedObj = {};

  for (let key in obj) {
    console.log(typeof obj[key]);
    //recursively copies objects within the object to ensure it is a deep copy 
    //and not just pointing to the object within the original object.
    if (typeof obj[key] === 'object') {
      copiedObj[key] = deepCopy(obj[key]);
    } else {
      copiedObj[key] = obj[key];
    }
  }
  return copiedObj;
}

//Just another way to do it. 
//If your object doesn't have any user defined methods it is really clean.
deepCopyTwo = (obj) => JSON.parse(JSON.stringify(obj));


testObj = {
  a: 1,
  b: 'b',
  c: {
    d: 'hello world',
    e: 5,
    f: () => 'hello'
  },
  g: () => 'goodbye'
};

let copy = deepCopyTwo(testObj);
console.log(testObj);
console.log(copy);

testObj.c.d = 'goodbye';

console.log(testObj);
console.log(copy);


