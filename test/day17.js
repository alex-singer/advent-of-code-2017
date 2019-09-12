const assert = require('assert');
const day17 = require('../Day17/main.js');

describe('Day 17', function() {
  describe('Spinlock#constructor', function() {
    it('New Spinlock(3) has pos=0,step=3, and contains [0]', function() {
      let spinlock = new day17.Spinlock(3);
      assert.deepEqual(spinlock.pos,0);
      assert.deepEqual(spinlock.step,3);
      assert.deepEqual(spinlock.values.get(0),0);
    });
  });
  describe('Spinlock#insert', function() {
    it('Spinlock(3).insert(1) results in [0,1]', function() {
      let spinlock = new day17.Spinlock(3);
      spinlock.insert(1);
      assert.deepEqual(spinlock.values.get(1), 1);
    });
    it('Spinlock(3).insert(2017) value at current position + 1 is 638', function() {
      let spinlock = new day17.Spinlock(3);
      spinlock.insert(2017);
      assert.deepEqual(spinlock.values.get(spinlock.pos + 1), 638);
    });
  });
});

