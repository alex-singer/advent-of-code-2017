const fs = require("fs");
const inputFile = "./input.txt";

fs.readFile(inputFile, "utf-8", (error, data) => {
  let lists = data.trim().split('\n').map( x => { return x.match(/(\d)+/g) });
  let groups = [];

  // Look over each house
  for (let x = 0; x < lists.length; x++) {
    // Look over each connection to each house
    for (let y = 0; y < lists[x].length; y++) {
      // For that connection, look through the other houses to 
      //  find the same connection
      for (let z = 0; z < lists.length; z++) {
        if (x === z) {
        } else if (lists[z].includes(lists[x][y])) {
          // console.log(lists[z], lists[x][y]);
          lists[x] = lists[x].concat(lists[z]);
          lists[z] = [];
          // console.log(lists[x]);
        }
      }
    }
  }

  /*
  for(let x = 0; x < lists.length; x++) {
    let ids = lists[x].match(/(\d)+/g);
    let currentGroups = [];
    for(let y = 0; y < ids.length; y++) {
      for(let z = 0; z < groups.length; z++) {
        if (groups[z].includes(ids[y])) {
          currentGroups.push(z);
        }
      }
    }
    if (currentGroups.length === 0){
      groups.push(ids);
    } else {
      for (i in currentGroups) {
        groups.push(groups[currentGroups[i]].concat(ids));
        groups[currentGroups[i]] = [];
      }
    }
  }

*/
  // Normalize Groups to remove duplicates
  for (let x = 0; x < lists.length; x++) {
    let tmpArray = [];
    for (element of lists[x]) {
      if (!tmpArray.includes(element)) {
        tmpArray.push(element);
      }
    }
    if (tmpArray.length > 0) {
      console.log(tmpArray.length);
    }
    lists[x] = tmpArray;
  }

});
