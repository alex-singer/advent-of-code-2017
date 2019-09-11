class Generator {
  constructor (factor, dividend, startValue, criteria) {
    this.factor = factor;
    this.dividend = dividend;
    this.startValue = startValue;
    this.criteria = criteria;
    this.values = [];
  }

  generate(count) {
    let lastValue = 0;
    while (this.values.length < count) {
      if(lastValue === 0) {
        lastValue = (this.startValue * this.factor) % this.dividend;
      } else {
        lastValue = (lastValue * this.factor) % this.dividend;
      }
      if(lastValue % this.criteria === 0) {
        this.values.push(lastValue);
      }
    }
  }

  static convertToBinary(value) {
    return parseInt(value,10).toString(2);
  }

  static judge(generatorA, generatorB) {
    let matches = 0;

    let index = 0
    while (index < generatorA.values.length && index < generatorB.values.length) {
      if (Generator.convertToBinary(generatorA.values[index]).slice(-16) ===
          Generator.convertToBinary(generatorB.values[index]).slice(-16)) {
        matches++;
      }
      index++;
    }
    return matches;
  }
}

if (process.argv[2] && process.argv[3]) {

  let matches = 0;
  let startA = process.argv[2];
  let startB = process.argv[3];

  for (let x = 0; x < 5; x++) {

    let generatorA = new Generator(16807, 2147483647, startA, 4);
    let generatorB = new Generator(48271, 2147483647, startB, 8);
    generatorA.generate(1000000);
    generatorB.generate(1000000);
    matches += Generator.judge(generatorA, generatorB);
    startA = generatorA.values[generatorA.values.length - 1];
    startB = generatorB.values[generatorB.values.length - 1];
    generatorA.values = [];
    generatorB.values = [];
  }
  console.log(matches);
}

module.exports = {
  Generator
}
