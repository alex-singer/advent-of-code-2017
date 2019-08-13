const fs = require("fs");

var inputFile = "./input.txt";
var checksum = 0;

fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) throw err;

  var low, high;
  rows = data.split('\n');
  for (var row of rows) {
    digits = row.split('\t');
    low = digits[0]; 
    high = digits[0];
    for (var digit of digits) {
      digit = parseInt(digit, 10);
      if (digit < low) { 
        low = digit; 
      } else if ( digit > high ) {
        high = digit;
      }
    }
    console.log(low, high);
    checksum += (high - low);
  }
  console.log(checksum);
});





