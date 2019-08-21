
const fs = require("fs");
const inputFile = "./input.txt";

function evaluateConditional(registers, testReg, testCond, testVal) {
  switch (testCond) {
    case '>':
      if (registers.get(testReg) > testVal) {
        return true;
      }
      break;
    case '<':
      if (registers.get(testReg) < testVal) {
        return true;
      }
      break;
    case '>=':
      if (registers.get(testReg) >= testVal) {
        return true;
      }
      break;
    case '<=':
      if (registers.get(testReg) <= testVal) {
        return true;
      }
      break;
    case '==':
      if (registers.get(testReg) === testVal) {
        return true;
      }
      break;
    case '!=':
      if (registers.get(testReg) !== testVal) {
        return true;
      }
      break;
    default:
      console.log(testCond, "There's a conditional I don't recognize");
  }
  return false;
}

fs.readFile(inputFile, 'utf-8', (err, data) => {
  if (err) throw error;

  let registers = new Map();

  let instructions = data.trim().split('\n');
  for (let x = 0; x < instructions.length; x++) {
    let reg = instructions[x].split(' ')[0];

    // If the register is not yet registered,
    //    add it with a value of zero
    if (!registers.has(reg)){
      registers.set(reg, 0);
    }

    let changeDir = instructions[x].split(' ')[1];
    let changeVal = parseInt(instructions[x].split(' ')[2], 10);

    let testReg = instructions[x].split(' ')[4];
    if (!registers.has(testReg)){
      registers.set(testReg, 0);
    }
    let testCond = instructions[x].split(' ')[5];
    let testVal = parseInt(instructions[x].split(' ')[6], 10);

    if(evaluateConditional(registers, testReg, testCond, testVal)) {
      // console.log(x, ": ", reg, testReg, testCond, testVal, registers.get(reg));
      if (changeDir === "inc") {
        registers.set(reg, registers.get(reg) + changeVal);
      } else {
        registers.set(reg, registers.get(reg) - changeVal);
      }
    }
  }
  let max = -999999;

  registers.forEach( (value, key, map) =>  { 
    if (value >= max) {
      max = value;
    }
  });

  console.log(max);
  console.log(registers);
});

