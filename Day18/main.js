class Duet {
  constructor() {
    this.registers = new Map();
    this.lastSound = 0;
  }

  command(instructions, i, queue) {

    // console.log(i, this.registers);
    let command = instructions[i].split(' ')[0];

    let x = instructions[i].split(' ')[1];
    if (!x.match(/[a-z]/i)) { x = parseInt(x, 10); }
    let y = instructions[i].split(' ')[2];
    if (y && !y.match(/[a-z]/i)) { y = parseInt(y, 10); }

    switch (command) {
      case 'set':
        if (typeof y === 'string') { y = this.registers.get(y); }
        this.registers.set(x, y)
        break;
      case 'snd':
        i++;
        if (typeof x === 'string') {
          if (this.registers.get(x)) {
            return [i, this.registers.get(x)];
          } else {
            return [i, 0];
          }
        } else {
          return [i, x];
        }
        break;
      case 'add':
        if (typeof y === 'string') { y = this.registers.get(y); }
        if (this.registers.get(x)) {
          this.registers.set(x, this.registers.get(x) + y);
        } else {
          this.registers.set(x, y);
        }
        break;
      case 'mul':
        if (typeof y === 'string') { y = this.registers.get(y); }
        this.registers.set(x, this.registers.get(x) * y);
        break;
      case 'mod':
        if (typeof y === 'string') { y = this.registers.get(y); }
        this.registers.set(x, this.registers.get(x) % y);
        break;
      case 'rcv':
        if (queue.length > 0) {
          this.registers.set(x, queue.shift());
        } else {
          return [i];
        }
        break;
      case 'jgz':
        if (typeof x === 'string') { x = this.registers.get(x); }
        if (typeof y === 'string') { y = this.registers.get(y); }
        if (x > 0) {
          i += y;
          return [i];
        }
        break;
      default:
        console.log('No command exists by this name.');
    }
    i++;
    return [i];
  }
}

if (process.argv[2]) {
  const { readFileSync } = require('fs');
  let instructions = readFileSync(process.argv[2], 'utf-8').trim().split('\n');

  let duetA = new Duet;
  let duetB = new Duet;
  let deadlock = false;
  let queueA = [];
  let indexA = 0;
  let sentA = 0;
  let termA = false;
  let queueB = [];
  let indexB = 0;
  let sentB = 0;
  let termB = false;
  let newIndex = 0;
  let sent = 0;

  // Prep the dancers
  duetA.registers.set('p',0);
  duetB.registers.set('p',1);

  while (termA === false && termB === false) {
    console.log("switching to A with ", queueA.length, duetA.registers);
    while(!termA) {
      sent = 0;
      // console.log("A", indexA, instructions[indexA], duetA.registers);
      [newIndex, sent] = duetA.command(instructions, indexA, queueA);
      if (indexA === newIndex) {
        termA = true;
        break;
      } else if (newIndex >= instructions.length || newIndex < 0) {
        termA = true;
        break;
      } else {
        indexA = newIndex;
      }
      if (sent) {
        queueB.push(sent);
        sentA++;
      }
    }
    console.log("switching to B with ", queueB.length, duetB.registers);
    if (queueB.length > 0) { termB = false; }
    while(!termB) {
      sent = 0;
      // console.log("B", indexB, instructions[indexB]);
      [newIndex, sent] = duetB.command(instructions, indexB, queueB);
      if (indexB === newIndex) {
        break;
      } else if (newIndex >= instructions.length || newIndex < 0) {
        termB = true;
        break;
      }
        else {
        indexB = newIndex;
      }
      if (sent) {
        queueA.push(sent);
        sentB++;
      }
    }
    if (queueA.length > 0) { termA = false; }
  }
  console.log(sentA);
  console.log(sentB);
}

module.exports = {
  Duet
}
