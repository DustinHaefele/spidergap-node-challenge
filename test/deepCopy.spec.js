const copy = require('../src/deepCopy');
const helper = require('./test-helpers');
const assert = require('assert');

describe('testing deep copy against object with all data types', () => {
  it('returns a copy of the object', () => {
    let obj = helper.testObjects[0];
    let copiedObj = copy.deepCopy(obj);
    assert.equal(obj.string, copiedObj.string);
    assert.equal(obj.number1, copiedObj.number1);
    obj.array.forEach((val, idx) => {
      assert.equal(val, copiedObj.array[idx]);
    });
    assert.equal(obj.obj.string2, copiedObj.obj.string2);
    assert.equal(obj.obj.number2, copiedObj.obj.number2);
    assert.equal(obj.obj.func1, copiedObj.obj.func1);
    assert.equal(obj.func2, copiedObj.func2);
  });

  it("copied object is it's own object and doesn't just point to original object", () => {
    let obj = helper.testObjects[0];
    let copiedObj = copy.deepCopy(obj);
    obj.number1 = 9999;
    assert.notEqual(obj.number1, copiedObj.number1);
  });

  it("copies objects within the object and doesn't just point to internal object", () => {
    let obj = helper.testObjects[0];
    let copiedObj = copy.deepCopy(obj);
    assert.equal(obj.obj.string2, copiedObj.obj.string2);
    assert.equal(obj.obj.number2, copiedObj.obj.number2);
    assert.equal(obj.obj.func1, copiedObj.obj.func1);
    obj.obj.string2 = 'new string';
    obj.obj.number2 = 99999;
    obj.obj.func1 = () => 'new function';
    assert.notEqual(obj.obj.string2, copiedObj.obj.string2);
    assert.notEqual(obj.obj.number2, copiedObj.obj.number2);
    assert.notEqual(obj.obj.func1, copiedObj.obj.func1);
  });

  it("copies objects within the object and doesn't just point to internal object", () => {
    let obj = helper.testObjects[0];
    let copiedObj = copy.deepCopy(obj);
    assert.equal(obj.array[0], copiedObj.array[0]);
    assert.equal(obj.array[1], copiedObj.array[1]);
    assert.equal(obj.array[2], copiedObj.array[2]);
    assert.equal(obj.array[3], copiedObj.array[3]);
    obj.array[0] = 'new value';
    obj.array[1] = 'new value';
    obj.array[2] = 'new value';
    obj.array[3] = 'new value';
    assert.notEqual(obj.array[0], copiedObj.array[0]);
    assert.notEqual(obj.array[1], copiedObj.array[1]);
    assert.notEqual(obj.array[2], copiedObj.array[2]);
    assert.notEqual(obj.array[3], copiedObj.array[3]);
  });
});
