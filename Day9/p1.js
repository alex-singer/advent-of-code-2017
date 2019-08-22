fs = require("fs");
inputFile = "./input.txt";

fs.readFile(inputFile, 'utf-8', (err, data) => {
  let bitstream = data.trim().split('');

  let level = 0; // How deep we're nested
  let score = 0;
  let stack = [];

  for (bit of bitstream) {
    if (stack[stack.length -1] === "!") {
      stack.pop();
    } else if (bit === "{" && stack[stack.length - 1] !== "<") {
      stack.push(bit);
      level++;
    } else if (bit === "}" && stack[stack.length -1] === "{") {
      stack.pop();
      score += level;
      level--;
    } else if (bit === "<" && stack[stack.length - 1] !== "<") {
      stack.push(bit);
    } else if (bit === ">" && stack[stack.length -1] === "<") {
      stack.pop();
    } else if (bit === "!") {
      stack.push(bit);
    } else {
      //console.log(`${bit} is not important enough for an else`);
    }
  }
  console.log(score);
});
