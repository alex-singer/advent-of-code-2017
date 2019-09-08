const assert = require('assert');
const day02 = require('../Day02/main.js');

describe('Day 2', function() {
  describe('#formatInput()', function() {
    it('Input "5 9 2 8" produces [5,9,2,8]', function() {
      assert.deepEqual(day02.formatInput("5 9 2 8"), [5,9,2,8]);
    });
    it('Input "5/t9/t2/t8" produces [5,9,2,8]', function() {
      assert.deepEqual(day02.formatInput("5\t9\t2\t8"), [5,9,2,8]);
    });
  });
  describe('#findEvenDivisorsQuotient()', function() {
    it('Input [5,9,2,8] produces 4', function() {
      assert.equal(day02.findEvenDivisorsQuotient([5,9,2,8]), 4);
    });
    it('Input [9,4,7,3] produces 3', function() {
      assert.equal(day02.findEvenDivisorsQuotient([9,4,7,3]), 3);
    });
    it('Input [3,8,6,5] produces 2', function() {
      assert.equal(day02.findEvenDivisorsQuotient([3,8,6,5]), 2);
    });
  });
  describe('#main()', function() {
    it(`Input "5 9 2 8/n9 4 7 3/n3 8 6 5" produces 9`, function() {
      assert.equal(day02.main("5 9 2 8\n9 4 7 3\n3 8 6 5"), 9);
    });
  });
});


