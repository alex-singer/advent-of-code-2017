const fs = require("fs");
const inputFile = "./input.txt";

function findIndexOfLargestBank(banks) {
  let largest = banks[0];
  let largestIndex = 0;
  for (let x = 0; x < banks.length; x++) {
    if (banks[x] > largest) {
      largest = banks[x];
      largestIndex = x;
    }
  }
  return largestIndex;
}

function arraysEqual(a1, a2) {
  return JSON.stringify(a1) == JSON.stringify(a2);
}

// DOES NOT LOOK AT THE LAST ENTRY. IM A HACK
function banksInBankHistory(bankHistory, banks) {
  for (let x = 0; x < bankHistory.length -1; x++) {
    if (arraysEqual(bankHistory[x], banks)) {
      return x;
    }
  }
  return false;
}

fs.readFile(inputFile, 'utf-8', (err, data) => {
  if (err) throw error;

  banks = data.split("\t").map(bank => parseInt(bank.trim(),10));
  let bankHistory = [];

  while (!banksInBankHistory(bankHistory, banks)) {

    // Distribute largest bank
    index = findIndexOfLargestBank(banks);
    largestIndexValue = banks[index];
    banks[index] = 0;
    for (let x = 0; x < largestIndexValue; x++) {
      index++;
      if ( index < banks.length) {
        banks[index]++;
      } else {
        index = 0;
        banks[index]++;
      }
    }
    bankHistory.push(banks.slice(0));
    console.log(bankHistory.length);
  }
  console.log(bankHistory.length - banksInBankHistory + 1);
});
