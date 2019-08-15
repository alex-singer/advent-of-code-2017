const fs = require("fs");
const inputFile = "./input.txt";

function isAnagram (word1, word2) {
  // This will rule out most, so we'll put it first
  if (word1.length !== word2.length) {
    return false;
  }

  let charArray1 = word1.split("");
  let charArray2 = word2.split("");
  let matchedChars = 0;


  for (var i = 0, len = charArray1.length; i < len; i++) {
    for (var j = 0, len = charArray2.length; j < len; j++) {
      if (charArray1[i] === charArray2[j]) {
        charArray2[j] = '+';
        matchedChars++;
        //console.log(matchedChars);
        break;
      }
    }
  }
  if (matchedChars === word2.length) {
    return true;
  }
}

fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) throw err;

  let validCount = 0;

  let passPhrases = [];
  passPhrases = data.split('\n');

  // Test for repeated words
  for (let passPhrase of passPhrases) {
    let valid = true;
    let words = passPhrase.split(" ");
    for (var i = 0; i < words.length; i++) {
      for (var j = 0; j < words.length ; j++) {
        if (i === j) {
        } else if (isAnagram(words[i], words[j])) {
          valid = false;
        }
      }
    }
    if (valid) {
      validCount++;
    }

  }
  console.log(validCount);
});
