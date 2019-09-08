/**
 * Takes a string of ints divided by spaces or tabs and return an array of ints.
 * @param {string} data - String of ints divided by a space or tab
 * @returns {array} - Array of ints.
 */
function formatInput(data) {
  data = data.replace(/\t/g, " ");
  return data.trim().split(' ')
      .map( (x) => { return parseInt(x, 10); });
};

/**
 * Takes an array of ints containing exactly one pair of even divisor and 
 *  dividend and returns their quotient.
 * @param {array} data - An array of ints
 * @returns {int} - The quotient of the even divisor and dividend
 */
function findEvenDivisorsQuotient(data) {
  divisor = 0; // divides into the dividend
  dividend = 0;

  for (var dividend of data) {
    for (var divisor of data) {
      if (dividend !== divisor && dividend % divisor === 0) {
        return dividend / divisor;
      }
    }
  }
}

function main(data) {

  let checksum = 0;

  rows = data.split('\n');
  for (var row of rows) {
    checksum += findEvenDivisorsQuotient(formatInput(row));
  }

  return checksum;
};


if (process.argv[2]) {
  const {readFileSync} = require("fs");
  let inputFile = process.argv[2];
  let input = readFileSync(inputFile, "utf-8").trim();

  var checksum = 0;

  console.log(main(input));
}

module.exports = {
  main,
  formatInput,
  findEvenDivisorsQuotient
}
