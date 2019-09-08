const assert = require('assert');
const day01 = require("../Day01/main.js");

describe('Day 1', function() {
  describe('#main()', function() {
    it('Input 1212 produces 6', function() {
      assert.equal(day01.main(1212), 6);
    });
    it('Input 1221 produces 0', function() {
      assert.equal(day01.main(1221), 0);
    });
    it('Input 123425 produces 4', function() {
      assert.equal(day01.main(123425), 4);
    });
    it('Input 123123 produces 12', function() {
      assert.equal(day01.main(123123), 12);
    });
    it('Input 12131415 produces 4', function() {
      assert.equal(day01.main(12131415), 4);
    });
  });
});
