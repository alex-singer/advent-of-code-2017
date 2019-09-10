class Disk {

  constructor(length, key) {
    const {KnotHash} = require('../knotHash.js');
    this.data = Disk
        .prepareInput(key, length)
        .map( (x) => { 
          return Disk.convertHashToBinary(new KnotHash(256).createHash(x));
        });
  }

  /**
   * Returns an array of hash inputs consisting of:
   *  the input, a dash, and the row. Returned array length
   *  will be equal to the row count.
   */
  static prepareInput(input, rowCount) {
    
    let hashInputs = [];

    for (let x = 0; x < rowCount; x++) {
      hashInputs.push(input.toString().trim().concat("-").concat(x));
    }

    return hashInputs;
  }

  static convertHashToBinary(hash) {

    hash = hash.split('')
            .map( (x) => { return parseInt(x,16).toString(2).padStart(4,'0'); } )
            .join('');

    hash = hash.split('');

    return hash;
  }

  countRegions() {
    let regions = 0;
    for(let x = 0; x < this.data.length; x++) {
      for(let y = 0; y < this.data.length; y++) {
        if (this.data[x][y] == "1") {
          regions++;
          this.findSurrounding(x, y);
        }
      }
    }
    return regions;
  }

  findSurrounding(x, y) {
    this.data[x][y] = 2;
    if (this.data[x + 1] && this.data[x + 1][y] == "1") {
      this.findSurrounding(x + 1, y);
    }
    if (this.data[x][y + 1] && this.data[x][y + 1] == "1") {
      this.findSurrounding(x, y + 1);
    }
    if (this.data[x][y - 1] && this.data[x][y - 1] == "1") {
      this.findSurrounding(x, y - 1);
    } 
    if (this.data[x - 1] && this.data[x - 1][y] == "1") {
      this.findSurrounding(x - 1, y);
    } 
  }
}


function main(input) {

  let disk = new Disk(128, input);

  let used = 0;
  for(let row of disk.data) {
    for(let region of row) {
      if (region == '1') {
        used++;
      }
    }
  }
  
  return disk.countRegions();

}

if (process.argv[2]) {
  const {readFileSync} = require('fs');
  console.log(main(readFileSync(process.argv[2])));
}

module.exports = {
  Disk
}



