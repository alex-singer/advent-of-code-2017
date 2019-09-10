const assert = require('assert');
const day14 = require('../Day14/main.js');
const {KnotHash} = require('../knotHash.js');

describe('Day 14', function() {
  describe('Disk#prepareInput()', function() {
    it("Input 'flqrgnkx',128 produces an array starting with 'flqrgnkx-0'" + 
       " and ending with 'flqrgnkx-127'", function() {
      assert.deepEqual(day14.Disk.prepareInput("flqrgnkx",128)[0], "flqrgnkx-0");
      assert.deepEqual(day14.Disk.prepareInput("flqrgnkx",128)[127], "flqrgnkx-127");
    });
  });
  describe('Disk#countRegions()', function() {
    it("Input 'flqrgnkx',128 produces a disk with 1242 regions", function() {
      disk = new day14.Disk(128, "flqrgnkx")
      assert.deepEqual(disk.countRegions(), 1242);
    });
  });
});
