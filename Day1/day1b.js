
let inputFile = "./input.txt"
let input = 0;
let sum = 0;

// read in input
const {readFileSync} = require('fs')
input = readFileSync(inputFile, "utf8");

// compare digits starting with the first and going till 2nd to last
// sum if digits match
for (let x = 0; x < (input.length)/2 - 1; x++) {


  // console.log(input[x], input[x + input.length/2]);
  if (input[x] === input[x + (input.length - 1)/2]) {
    sum += parseInt(input[x], 10);
    //console.log(input[x],input[x+ (input.length - 1)/2]);
  }

}

// output final sum
console.log(sum * 2);


