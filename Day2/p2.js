const fs = require("fs");

var inputFile = "./input.txt";
var checksum = 0;

fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) throw err;

  var low, high;
  rows = data.split('\n');
  for (var row of rows) {
    digits = row.split('\t');
    divisor = 0; // divides into the dividend
    dividend = 0;

    for (var dividend of digits) {
      dividend = parseInt(dividend, 10);
      for (var divisor of digits) {
        divisor = parseInt(divisor, 10);
        if (dividend !== divisor && dividend % divisor === 0) {
          console.log(dividend, divisor, (dividend / divisor));
          checksum += (dividend / divisor);
        }
      }
    }
  }
  console.log(checksum);
});





