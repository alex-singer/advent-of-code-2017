const assert = require('assert');
const day18 = require('../Day18/main.js');

describe('Day 18', function() {
  describe('Duet#constructor', function() {
    it('Creates a new Duet with an empty array of reg and no last sound', function() {
      let duet = new day18.Duet();
      assert.deepEqual(duet.registers, new Map());
      assert.deepEqual(duet.lastSound, 0);
    });
  });
  describe('Duet#command', function() {
    it('SET | set a 6 - Creates and sets register a to 6', function() {
      let duet = new day18.Duet();
      duet.command(['set a 6'], 0);
      assert.deepEqual(duet.registers.get('a'), 6);
    });
    it('SND | snd 6 - Sends array with value 6', function() {
      let duet = new day18.Duet();
      let [x, queue] = duet.command(['snd 6'], 0);
      assert.deepEqual(queue, 6);
    });
    it('SND | set f 12, snd f - Sets last sound to 12', function() {
      let duet = new day18.Duet();
      duet.command(['set f 12'], 0);
      let [x, queue] = duet.command(['snd f'], 0);
      assert.deepEqual(queue, 12);
    });
    it('ADD | add f 12, add f 12 - Sets f to 24', function() {
      let duet = new day18.Duet();
      duet.command(['add f 12'], 0);
      duet.command(['add f 12'], 0);
      assert.deepEqual(duet.registers.get('f'), 24);
    });
    it('MUL | add f 12, mul f 3 - Sets f to 36', function() {
      let duet = new day18.Duet();
      duet.command(['add f 12'], 0);
      duet.command(['mul f 3'], 0);
      assert.deepEqual(duet.registers.get('f'), 36);
    });
    it('MOD | add f 12, mod f 9 - Sets f to 3', function() {
      let duet = new day18.Duet();
      duet.command(['add f 12'], 0);
      duet.command(['mod f 9'], 0);
      assert.deepEqual(duet.registers.get('f'), 3);
    });
    it('RCV | rcv a returns null, set a 12, then returns 0', function() {
      let duet = new day18.Duet();
      duet.command(['rcv a'], 0, []);
      assert.deepEqual(duet.registers.get('a'), null);
      duet.command(['rcv a'], 0, [12]);
      assert.deepEqual(duet.registers.get('a'), 12);
    });
  });
});
