const fs = require("fs");
const inputFile = "./input.txt";


// Increase number of rounds to 64 while preserving pos and skip size

fs.readFile(inputFile, 'utf-8', (err, data) => {
  if (err) throw error;

  let currentPos = 0;
  let skipSize = 0;
  let list = [];

  // Convert input lengths to their ASCII codes (including commas)
  let lengths = data.trim().split("").
      map(char => { return char.charCodeAt() });

  // Add the standard length suffix values (17, 31, 73, 47, 23)
  let suffixArray = [17, 31, 73, 47, 23];
  lengths = lengths.concat(suffixArray);

  for (var x = 0, len = 256; x < len; x++) {
    list[x] = x;
  }

  for (let j = 0; j < 64; j++) {
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
        console.log(currentPos);
        currentPos %= (list.length);
        console.log(currentPos);
      }
      skipSize++;
      console.log(`Length: ${length}  Current Position: ${currentPos} Skip: ${skipSize}  List: ${list}`);
    }

    let denseList = [];
    let count = 1;
    for(let x = 0; x < list.length; x++) {
      denseList[Math.floor(x / 16)] = denseList[Math.floor(x / 16)] ^ list[x];
    }
    console.log(denseList);
    denseList = denseList.map( x => {
      x =  x.toString(16);
      if (x.length < 2) {
        x = "0" + x;
      }
      return x;
    }).join("");
    console.log(denseList);
  }

});
