const assert = require('assert');
const {LinkedList} = require('../Day17/main.js');

describe('LinkedList', function() {
  describe('LinkedList#constructor', function() {
    it('Inititates to an undefined head node and 0 length', function() {
      linkedList = new LinkedList();
      assert.deepEqual(linkedList.head, undefined);
      assert.deepEqual(linkedList.length, 0);
    });
  });
  describe('LinkedList#insert', function() {
    it('Properly inserts to the beginning of an empty list', function() {
      linkedList = new LinkedList();
      linkedList.insert(1, 0);
      assert.deepEqual(linkedList.head.value, 1);
      assert.deepEqual(linkedList.length, 1);
    });
    it('Properly inserts to the beginning of a list', function() {
      linkedList = new LinkedList();
      linkedList.insert(1, 0);
      linkedList.insert(2, 0);
      linkedList.insert(3, 0);
      linkedList.insert(4, 0);
      assert.deepEqual(linkedList.head.value, 4);
      assert.deepEqual(linkedList.head.next.value, 3);
      assert.deepEqual(linkedList.length, 4);
    });
    it('Properly inserts to the end of a list', function() {
      linkedList = new LinkedList();
      linkedList.insert(1, 0);
      linkedList.insert(2, linkedList.length);
      linkedList.insert(3, linkedList.length);
      linkedList.insert(4, linkedList.length);
      assert.deepEqual(linkedList.head.value, 1);
      assert.deepEqual(linkedList.head.next.value, 2);
      assert.deepEqual(linkedList.head.next.next.value, 3);
      assert.deepEqual(linkedList.tail.value, 4);
      assert.deepEqual(linkedList.length, 4);
    });
    it('Properly inserts to the middle of a list', function() {
      linkedList = new LinkedList();
      linkedList.insert(1, 0);
      linkedList.insert(2, linkedList.length);
      linkedList.insert(4, linkedList.length);
      linkedList.insert(3, 2);
      assert.deepEqual(linkedList.head.value, 1);
      assert.deepEqual(linkedList.head.next.value, 2);
      assert.deepEqual(linkedList.head.next.next.value, 3);
      assert.deepEqual(linkedList.length, 4);
    });
  });
  describe('LinkedList#get', function() {
    it('Properly returns value 3 when given index 2', function() {
      linkedList = new LinkedList();
      linkedList.insert(1, 0);
      linkedList.insert(2, linkedList.length);
      linkedList.insert(3, linkedList.length);
      linkedList.insert(4, linkedList.length);
      assert.deepEqual(linkedList.get(2), 3);
    });
  });
});

