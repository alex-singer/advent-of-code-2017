const fs = require("fs");
const inputFile = "./input.txt";

fs.readFile(inputFile, 'utf-8', (err, data) => {
  let steps = data.split('\n').map(step => step.trim());
  steps.pop();

  let index = 0; // This will constantly change. Not just incre
  let stepCount = 0;

  while (index < steps.length) {
    stepCount++;
    if (steps[index] >= 3) {
      steps[index]--;
      index += steps[index] + 1;
    } else {
      steps[index]++;
      index += steps[index] - 1;
    }
  }
  console.log(stepCount);
});
