class Trope {
  constructor(programCount) {
    this.programs = [];
    this.initializePrograms(programCount);
  }

  initializePrograms(programCount) {
    let dancers = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 
                   'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'];

    for (let x = 0; x < programCount; x++) {
      this.programs.push(dancers[x]);
    }
  }

  command(command) {
    // Could be refactored to switch 
    if (command[0] === 's') {
      this.spin(parseInt(command.slice(1),10));
    } else if (command[0] === 'x') {
      let index1 = parseInt(command.slice(1).split('/')[0], 10);
      let index2 = parseInt(command.slice(1).split('/')[1], 10);
      this.exchange(index1, index2);
    } else if (command[0] === 'p') {
      let index1 = command.slice(1).split('/')[0];
      let index2 = command.slice(1).split('/')[1];
      this.partner(index1, index2);
    }
  }

  spin(count) {
    let newOrder = [];

    for (let x = 0; x < count; x++) {
      newOrder.push(this.programs[this.programs.length - count + x])
    }

    let index = 0;
    for (let x = newOrder.length; x < this.programs.length; x++) {
      newOrder.push(this.programs[index]);
      index++;
    }

    this.programs = newOrder;
  }

  exchange(index1, index2) {
    let tmp = this.programs[index1];
    this.programs[index1] = this.programs[index2];
    this.programs[index2] = tmp;
  }

  partner(val1, val2) {
    this.exchange(
      this.programs.findIndex((x) => { return x === val1; }), 
      this.programs.findIndex((x) => { return x === val2; }))
  }
}

if (process.argv[2]) {
  const {readFileSync} = require('fs');
  let commands = readFileSync(process.argv[2], 'utf-8').trim().split(',');
  let trope = new Trope(16);

  let tropeFinalsSingle = new Map;
  let tropeFinalsThousand = new Map;

  for (let x = 0; x < 1000000; x++) {
    if (tropeFinalsThousand.get(trope.programs.join(''))) {
      trope.programs = tropeFinalsThousand.get(trope.programs.join('')).split('');
    } else {
      let startThousand = trope.programs.join('');
      for (let y = 0; y < 1000; y++) {
        if (tropeFinalsSingle.get(trope.programs.join(''))) {
          trope.programs = tropeFinalsSingle.get(trope.programs.join('')).split('');
        } else {
          let start = trope.programs.join('');
          for (command of commands) {
            trope.command(command);
          }
          tropeFinalsSingle.set(start, trope.programs.join(''));
        }
      }
      tropeFinalsThousand.set(startThousand, trope.programs.join(''));
    }
    if (x % 1000000 === 0) { console.log(x); }
  }
  console.log(trope.programs.join(''))
}


module.exports = {
  Trope
}
