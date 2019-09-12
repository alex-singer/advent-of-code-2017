class Node {
  constructor(value) {
    this.value = value;
    this.next = undefined;
    this.prev = undefined;
  }
}

/*
 * I created this linked list class from scratch without help from 
 * what I remembered from school. It's crap. I know.
 */
class LinkedList {
  constructor() {
    this.head = undefined;
    this.tail = undefined;
    this.length = 0;
  }

  insert(value, index) {
    let node = new Node(value);

    // Search from the back if greater than half
    if (index > this.length / 2 && index !== this.length) {
      let prevNode = this.tail;
      for(let x = 0; x < this.length - index; x++) {
        prevNode = prevNode.prev
      }
      node.next = prevNode.next;
      node.prev = prevNode;
      prevNode.next = node;
      node.next.prev = node;
    } else if (index > 0 && index !== this.length) {
      let prevNode = this.head;
      for(let x = 1; x < index; x++) {
        prevNode = prevNode.next
      }
      node.next = prevNode.next;
      node.prev = prevNode;
      prevNode.next = node;
      node.next.prev = node;
    } else if (index === 0) {
      node.next = this.head;
      this.head = node;
      if (!this.tail) { this.tail = this.head; }
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }

    this.length++;
  }

  get(index) {
    if (index > 0) {
      let prevNode = this.head;
      for(let x = 0; x < index; x++) {
        prevNode = prevNode.next
      }
      return(prevNode.value);
    } else {
      return(this.head.value);
    }
  }
}

class Spinlock {
  constructor(step) {
    this.pos = 0;
    this.step = step;
    this.values = new LinkedList();

    this.values.insert(0,0);
  }

  insert(count) {
    for (let i = 0; i < count; i++) {
      this.pos = ((this.pos + this.step) % this.values.length) + 1;
      this.values.insert(i + 1, this.pos);
    }
  }
  calm(count) {
    let calmNumber = 0;
    for (let i = 0; i < count; i++) {
      let length = i + 1;
      // console.log(`Pos: ${this.pos} | length ${length}`);
      this.pos = ((this.pos + this.step) % length) + 1;
      if (this.pos === 1) {
        calmNumber = i + 1;
      }
    }
    return calmNumber;
  }
}

if (process.argv[2]) {
  const {readFileSync} = require('fs');
  let step = process.argv[2];

  spinlock = new Spinlock(parseInt(step, 10));
  for (let x = 0; x < 1; x++) {
    console.log(spinlock.calm(50000000));
  }
}

module.exports = {
  LinkedList,
  Spinlock
}
