class Packet {
  constructor() {
    this.prevX = null;
    this.prevY = null;
    this.direction = null;
    this.x = null;
    this.y = null;
    this.letters = []
    this.stepsTaken = 0;
  }

  travel(map) {
    if (this.x === null) {
      // Comb map[0] for the starting location
      for (let i = 0; i < map[0].length; i++){
        if (map[0][i] === '|') {
          this.direction = 's';
          this.x = 0;
          this.y = i;
        }
      }
    }

    while (1 === 1) {
      let moved = false;

      // Try moving straight
      if (this.direction === 'n') {
        moved = this.move(map, this.x - 1, this.y);
      } else if (this.direction === 'e') {
        moved = this.move(map, this.x, this.y + 1);
      } else if (this.direction === 's') {
        moved = this.move(map, this.x + 1, this.y);
      } else if (this.direction === 'w') {
        moved = this.move(map, this.x, this.y - 1);
      }

      // If you can't move striaght, try every other way
      if (!moved) { // Try N
        moved = this.move(map, this.x - 1, this.y);
        this.direction = 'n';
      } 
      if (!moved) { // Try E
        moved = this.move(map, this.x, this.y + 1);
        this.direction = 'e';
      } 
      if (!moved) { // Try S
        moved = this.move(map, this.x + 1, this.y);
        this.direction = 's';
      } 
      if (!moved) { // Try W
        moved = this.move(map, this.x, this.y - 1);
        this.direction = 'w';
      } 

      // If still not moved, ya done
      if (!moved) { 
        return this.stepsTaken;
      }

      if (map[this.x][this.y].match(/[A-Z]/i)) {
        this.letters.push(map[this.x][this.y]);
      }
    }
  }

  move(map, x, y) {
    if (x === this.prevX && y === this.prevY) {
      return false;
    }

    if (map[x] && map[x][y] && map[x][y] !== ' ') {
      this.prevX = this.x;
      this.prevY = this.y;
      this.x = x;
      this.y = y;
      this.stepsTaken++;
      return true;
    }

    return false;
  }
}

if (process.argv[2]) {
  const { readFileSync } = require('fs');
  const map = readFileSync(process.argv[2], 'utf-8')
    .split('\n')
    .map( (row) => { return row.split(''); });

  let packet = new Packet();

  console.log(packet.travel(map));
}






