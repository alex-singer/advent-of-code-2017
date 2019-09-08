function prepInput(input) {

  if(typeof(input) === "string") {
    input = input.trim().split('')
        .map(x => { return parseInt(x, 10) });
  }

  if(typeof(input) === "number") {
    input = input.toString(10).trim().split('')
        .map(x => { return parseInt(x, 10) });
  }

  return input;
}

function main(input) {

  input = prepInput(input);

  let sum = 0;

  for (let x = 0; x < (input.length)/2; x++) {
    if (input[x] === input[x + (input.length)/2]) {
      sum += parseInt(input[x], 10);
    }

  }

  return (sum * 2)
};

if (process.argv[2]) {
  const {readFileSync} = require('fs')
  let inputFile = process.argv[2];

  let input = readFileSync(inputFile, "utf8");
  console.log(`The solution is ${main(input)}`);
}

module.exports = {
  main
}
