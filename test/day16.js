const assert = require('assert');
const day16 = require('../Day16/main.js');

// Trope
// - programs = a-p
//
// split
// exchange
// partner

describe('Day 16', function() {
  describe('Trope#constructor()', function() {
    it('Trope(5) should create a trope of programs a-e', function() {
      let trope = new day16.Trope(5);
      assert.deepEqual(trope.programs[0], 'a');
      assert.deepEqual(trope.programs[trope.programs.length - 1], 'e');
    });
    it('Trope(16) should create a trope of programs a-p', function() {
      let trope = new day16.Trope(16);
      assert.deepEqual(trope.programs[0], 'a');
      assert.deepEqual(trope.programs[trope.programs.length - 1], 'p');
    });
  });
  describe('Trope#spin', function() {
    it('spin(3) on abcde produces cdeab', function() {
      let trope = new day16.Trope(5);
      trope.spin(3);
      assert.deepEqual(trope.programs, ['c', 'd', 'e', 'a', 'b']);
    });
  });
  describe('Trope#exchange', function() {
    it('exchange(3,4) on cdeab produces eabdc', function() {
      let trope = new day16.Trope(5);
      trope.spin(1);
      trope.exchange(3,4);
      assert.deepEqual(trope.programs, ['e', 'a', 'b', 'd', 'c']);
    });
  });
  describe('Trope#partner', function() {
    it('partner(e,b) on eabdc produces baedc', function() {
      let trope = new day16.Trope(5);
      trope.spin(1);
      trope.exchange(3,4);
      trope.partner('e','b');
      assert.deepEqual(trope.programs, ['b', 'a', 'e', 'd', 'c']);
    });
  });
  describe('Trope#command', function() {
    it('s1 on abcde produces eabcd', function() {
      let trope = new day16.Trope(5);
      trope.command('s1');
      assert.deepEqual(trope.programs, ['e', 'a', 'b', 'c', 'd']);
    });
    it('x3/4 on eabcd produces eabdc', function() {
      let trope = new day16.Trope(5);
      trope.command('s1');
      trope.command('x3/4');
      assert.deepEqual(trope.programs, ['e', 'a', 'b', 'd', 'c']);
    });
    it('xe/b on eabdc produces baedc', function() {
      let trope = new day16.Trope(5);
      trope.command('s1');
      trope.command('x3/4');
      trope.command('pe/b');
      assert.deepEqual(trope.programs, ['b', 'a', 'e', 'd', 'c']);
    });
  });
});
