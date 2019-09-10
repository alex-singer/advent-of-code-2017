const assert = require('assert');
const day10 = require('../Day10/main.js');

describe('Day 10', function() {
  describe('#prepareInput()', function() {
    it('"1,2,3" becomes [49,44,50,44,51,17,31,73,47,23]', function() {
      assert.deepEqual(day10.prepareInput("1,2,3"), [49,44,50,44,51,17,31,73,47,23]);
    });
  });
  describe('KnotHash#reverseArraySubset()', function() {
    it('[0,1,2,3,4] with pos=0 and length=3 returns [2,1,0,3,4]', function() {
      let knotHash = new day10.KnotHash(5);
      knotHash.reverseArraySubset(3);
      assert.deepEqual(knotHash.array, [2,1,0,3,4]);
    });
    it('[2,1,0,3,4] with pos=3 and length=4 returns [4,3,0,1,2]', function() {
      let knotHash = new day10.KnotHash(5);
      knotHash.reverseArraySubset(3);
      knotHash.reverseArraySubset(4);
      assert.deepEqual(knotHash.array, [4,3,0,1,2]);
    });
    it('Reversing an array sublist of a single element has no effect', function() {
      let knotHash = new day10.KnotHash(5);
      knotHash.reverseArraySubset(1);
      assert.deepEqual(knotHash.array, [0,1,2,3,4]);
    });
  });
  describe('#main()', function() {
    it('The empty string becomes a2582a3a0e66e6e86e3812dcb672a272', function() {
      assert.deepEqual(day10.main(""), "a2582a3a0e66e6e86e3812dcb672a272");
    });
    it('AoC 2017 becomes 33efeb34ea91902bb2f59c9920caa6cd', function() {
      assert.deepEqual(day10.main("AoC 2017"), "33efeb34ea91902bb2f59c9920caa6cd");
    });
    /*
    it('The empty string becomes a2582a3a0e66e6e86e3812dcb672a272', function() {
      assert.deepEqual(day10.prepareInput("1,2,3"), [49,44,50,44,51,17,31,73,47,23]);
    });
    it('The empty string becomes a2582a3a0e66e6e86e3812dcb672a272', function() {
      assert.deepEqual(day10.prepareInput("1,2,3"), [49,44,50,44,51,17,31,73,47,23]);
    });
    */
  });
});
