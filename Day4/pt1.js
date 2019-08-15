const fs = require("fs");
const inputFile = "./input.txt";


fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) throw err;

  let invalidCount = 0;

  let passPhrases = [];
  passPhrases = data.split('\n');

  // Test for repeated words
  for (let passPhrase of passPhrases) {
    let valid = true;
    let words = passPhrase.split(" ");
    for (var i = 0; i <= words.length; i++) {
      for (var j = 0; j <= words.length ; j++) {
        if (i !== j && words[i] === words[j]) {
          valid = false;
        }
      }
    }
    if (!valid) {
      invalidCount++;
    }

  }
  console.log(invalidCount);
});
