const fs = require("fs");
const inputFile = "./input.txt";

fs.readFile(inputFile, 'utf-8', (err, data) => {
  if (err) throw error;

  let currentPos = 0;
  let skipSize = 0;
  let list = [];
  let lengths = data.trim().split(",");

  for (var x = 0, len = 256; x < len; x++) {
    list[x] = x;
  }

  for (var x = 0, len = lengths.length; x < len; x++) {
    let length = lengths[x];
    let tmpArray = [];
    let tmpPos = currentPos;
    

    for (let y = 0; y < length; y++) {
      tmpArray.push(list[tmpPos]);
      tmpPos++;
      if (tmpPos > list.length -1) {
        tmpPos = 0;
      }
    }
    
    // Reverse the tmp array
    for (let y = 0; y < length / 2; y++) {
      let tmp = tmpArray[y];
      tmpArray[y] = tmpArray[tmpArray.length - y - 1];
      tmpArray[tmpArray.length - y - 1] = tmp;
    }

    // Overwrite the list with the reversed array
    for (let y = 0; y < tmpArray.length; y++) {
      list[currentPos] = tmpArray[y];
      currentPos++;
      if (currentPos > list.length - 1) {
        currentPos = 0;
      }
    }

    currentPos += skipSize;
    if (currentPos > list.length - 1) {
      currentPos -= (list.length);
    }
    skipSize++;
    console.log(`Length: ${length}  Current Position: ${currentPos} Skip: ${skipSize}  List: ${list}`);
  }
});
