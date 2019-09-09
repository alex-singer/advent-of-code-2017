const assert = require('assert');
const day03 = require('../Day03/main.js');

describe('Day 3', function() {
  describe('#findValue()', function() {
    it('2nd point (1,0) has a value of 1', function() {
      let array = [];
      array.push(new day03.Point(1, 0, 0));
      array.push(new day03.Point(day03.findValue(1, 0, array), 1, 0));
      assert.deepEqual(array[1].value, 1);
    });
    it('3rd point (1,1) has a value of 2', function() {
      let array = [];
      array.push(new day03.Point(1, 0, 0));
      array.push(new day03.Point(day03.findValue(1, 0, array), 1, 0));
      array.push(new day03.Point(day03.findValue(1, 1, array), 1, 1));
      assert.deepEqual(array[2].value, 2);
    });
    it('4th point (0,1) has a value of 4', function() {
      let array = [];
      array.push(new day03.Point(1, 0, 0));
      array.push(new day03.Point(day03.findValue(1, 0, array), 1, 0));
      array.push(new day03.Point(day03.findValue(1, 1, array), 1, 1));
      array.push(new day03.Point(day03.findValue(0, 1, array), 0, 1));
      assert.deepEqual(array[3].value, 4);
    });
  });
});

 
