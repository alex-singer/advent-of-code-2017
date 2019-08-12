
let inputFile = "./input.txt"
let input = 0;
let sum = 0;

// read in input
const {readFileSync} = require('fs')
input = readFileSync(inputFile, "utf8");

// compare digits starting with the first and going till 2nd to last
// sum if digits match
for (let x = 0; x < input.length - 2; x++) {
  if (input[x] === input[x + 1]) {
    sum += parseInt(input[x], 10);
  }
  console.log(input[x]);
}

// check for the last digit
if (input[0] === input[input.length-2]) {
  sum += parseInt(input[0], 10);
}

// output final sum
console.log(sum);


