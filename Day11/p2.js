const fs = require("fs");
const inputFile = "./input.txt";

fs.readFile(inputFile, 'utf-8', (err, data) => {
  let directions = data.trim().split(",");

  let n = 0;
  let ne = 0;
  let se = 0;
  let s = 0;
  let sw = 0;
  let nw = 0;

  let maxDistance = 0;

  for(let x = 0; x < directions.length; x++){
    switch (directions[x]) {
      case 'n':
        if (s > 0) {
          s--;
        } else if (se > 0) {
          se--;
          ne++;
        } else if (sw > 0) {
          sw--;
          nw++;
        } else {
          n++;
        }
        break;
      case 'ne':
        if (sw > 0) {
          sw--;
        } else if (nw > 0) {
          nw--;
          n++;
        } else if (s > 0) {
          s--;
          se++;
        } else {
          ne++;
        }
        break;
      case 'se':
        if (nw > 0) {
          nw--;
        } else if (n > 0) {
          n--;
          ne++;
        } else if (sw > 0) {
          sw--;
          s++;
        } else {
          se++;
        }
        break;
      case 's':
        if (n > 0) {
          n--;
        } else if (ne > 0) {
          ne--;
          se++;
        } else if (nw > 0) {
          nw--;
          sw++;
        } else {
          s++;
        }
        break;
      case 'sw':
        if (ne > 0) {
          ne--;
        } else if (n > 0) {
          n--;
          nw++;
        } else if (se > 0) {
          se--;
          s++;
        } else {
          sw++;
        }
        break;
      case 'nw':
        if (se > 0) {
          se--;
        } else if (ne > 0) {
          ne--;
          n++;
        } else if (s > 0) {
          s--;
          sw++;
        } else {
          nw++;
        }
        break;
    }
    if (n + ne + se + s + sw + nw > maxDistance) {
      maxDistance = n + ne + se + s + sw + nw;
    }
  }
  console.log(maxDistance);
});
