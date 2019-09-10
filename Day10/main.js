class KnotHash {
  constructor(length) {
    this.pos = 0;
    this.skipSize = 0;
    this.array = this.prepareNewArray(length);
  }

  prepareNewArray(length) {
    let array = [];
    for (let x = 0; x < length; x++) {
      array[x] = x;
    }
    return array;
  }

  reverseArraySubset(length) {

    // Cycle through the first half of the substring
    for (let x = 0; x < Math.floor(length / 2); x++) {

      // Set the pos value to tmp, assign the far value to pos, 
      //  assign tmp to far value
      // Far value is determined by taking the current position, adding the 
      //  substring length, subtracting the offset we're switching (x) times 2
      //  (multiplied by two because two numbers are effected), subtract one
      //  more because length starts at one while arrays start at zero, and 
      //  then mod the array length to make it circular
      let tmp = this.array[this.pos];
      this.array[this.pos] = this.array[(this.pos + length - (x * 2) - 1) % this.array.length];
      this.array[(this.pos + length - (x * 2) - 1) % this.array.length] = tmp;

      // Move pos forward one, looping if required
      this.pos++;
      if (this.pos > this.array.length - 1) {
        this.pos = 0;
      }
    }

    // Move pos forward the other half of the substring and skipSize
    // Increment skipSize
    this.pos = (this.pos + Math.ceil(length / 2) + this.skipSize) % this.array.length;
    this.skipSize = this.skipSize + 1;
  }

  convertToDenseHash() {
    let denseList = [];
    let count = 1;
    for(let x = 0; x < this.array.length; x++) {
      denseList[Math.floor(x / 16)] = denseList[Math.floor(x / 16)] ^ this.array[x];
    }
    denseList = denseList.map( x => {
      x =  x.toString(16);
      if (x.length < 2) {
        x = "0" + x;
      }
      return x;
    }).join("");
  return (denseList);
  }
}


/**
 * Convert the input lengths to an array of ASCII codes and
 *  prepend the standard length suffix values.
 * @param {string} input - String of input lengths.
 * @return {array} - Array of ASCII codes prepended by suffix values
 */
function prepareInput(data) {

  data = data.trim().split("").
    map(char => { return char.charCodeAt() });

  // Add the standard length suffix values (17, 31, 73, 47, 23)
  let suffixArray = [17, 31, 73, 47, 23];
  data = data.concat(suffixArray);

  return data;
}

if (process.argv[2]) {
  const {readFileSync} = require("fs");

  let input = readFileSync(process.argv[2], 'utf-8');

  console.log(`The Knot Hash is: ${main(input)}`);
}

// Increase number of rounds to 64 while preserving pos and skip size

function main(data) {

  let lengths = prepareInput(data);
  let knotHash = new KnotHash(256);

  // Per round
  for (let j = 0; j < 64; j++) {
    //Per length
    for (let x = 0, len = lengths.length; x < len; x++) {
      knotHash.reverseArraySubset(lengths[x]);
    }
  }
  return(knotHash.convertToDenseHash());
}

module.exports = {
  main,
  KnotHash,
  prepareInput,
}
