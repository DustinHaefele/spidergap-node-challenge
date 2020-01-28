const testObjects= [
  {
    number1: 1,
    string1: 'b',
    array: [1,2,3,4],
    obj: {
      string2: 'hello world',
      number2: 5,
      func1: () => 'hello'
    },
    func2: () => 'goodbye'
  },
];

//{top: {mid: {bottom: 7}}},

module.exports = {
  testObjects,
}