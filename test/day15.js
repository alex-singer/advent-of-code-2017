
/*
 * class Generator
 * - factor
 *   dividend
 *   values
 *   starting value
 *
 *   generate(count)
 *    generates from scratch up to count in binary
 *
 *
 * main
 *  create generators
 *  generate
 *  compare and count
 */


const assert = require('assert');
const day15 = require('../Day15/main.js');

describe('Day 15', function() {
  describe('Generator#generate()', function() {
    it('Calling generator.Generate with zero count results in zero values', function() {
      let generatorA = new day15.Generator(16807, 2147483647, 65);
      generatorA.generate(0);
      assert.deepEqual(generatorA.values.length, 0);
    });
    it('Generator A - First five values are correct', function() {
      let generatorA = new day15.Generator(16807, 2147483647, 65,1);
      generatorA.generate(5);
      assert.deepEqual(generatorA.values[0], 1092455);
      assert.deepEqual(generatorA.values[1], 1181022009);
      assert.deepEqual(generatorA.values[2], 245556042);
      assert.deepEqual(generatorA.values[3], 1744312007);
      assert.deepEqual(generatorA.values[4], 1352636452);
    });
    it('Generator B - First five values are correct', function() {
      let generatorB = new day15.Generator(48271, 2147483647, 8921, 1);
      generatorB.generate(5);
      assert.deepEqual(generatorB.values[0], 430625591);
      assert.deepEqual(generatorB.values[1], 1233683848);
      assert.deepEqual(generatorB.values[2], 1431495498);
      assert.deepEqual(generatorB.values[3], 137874439);
      assert.deepEqual(generatorB.values[4], 285222916);
    });
  });
  describe('Generator#judge()', function() {
    it('Comparing the first five values of A and B shows one match', function() {
      let generatorA = new day15.Generator(16807, 2147483647, 65, 1);
      let generatorB = new day15.Generator(48271, 2147483647, 8921, 1);
      generatorA.generate(5);
      generatorB.generate(5);
      let matches = day15.Generator.judge(generatorA, generatorB);
      assert.deepEqual(matches, 1);
    })
  });
});
