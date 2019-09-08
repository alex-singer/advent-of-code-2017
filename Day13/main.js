
// Create a class of each firewall with the layer, range, 
//   location, move method

/** Class representing a single firewall. */
class Firewall {
  /** 
   * Create a firewall. 
   * Sets initial location to 0.
   * Sets accending to true, as the firewall will start by moving up the range.
   * @param {number} layer - The layer the firewall exists in.
   * @param {number} range - The range of the firewall.
   */
  constructor(layer, range) {
    this.layer = parseInt(layer, 10);
    this.vRange = parseInt(range, 10);
    this.vLocation = 0;
    this.accending = true;
  }

  /**
   * Move the firewall on click.
   * @param {number} clicks - The number of times to move the firewall
   */
  move(clicks = 1) {
    // Reduce clicks to by removing full loops
    clicks = clicks % ((this.vRange * 2) - 2);

    for (let x = 0; x < clicks; x++) {
      if (this.vLocation === 0) {
        
        // Change the direction of the firewall
        this.accending = true;

        // Move the firewall one click
        this.vLocation++;
      } else if (this.vLocation === this.vRange - 1) {

        // Change the direction of the firewall
        this.accending = false;

        // Move the firewall one click
        this.vLocation--;
      } else if (this.accending) {

        // Move the location up
        this.vLocation++;
      } else if (!this.accending) {

        // Move the location down
        this.vLocation--;
      }
    }
  }
}

class Frogger {
  constructor() {
    this.hLocation = 0;
    this.burn = 0;
    this.caught = false;
  }
  move() {
    this.hLocation++;
  }
}

function passTime(firewalls, frogger) {
  for (firewall of firewalls) {
    if (frogger && firewall.layer === frogger.hLocation && firewall.vLocation === 0) {
      frogger.burn += (firewall.layer * firewall.vRange);
      frogger.caught = true;
    }
    firewall.move();
  }
  if (frogger) {
    frogger.move();
  }
}

const fs = require("fs");
const inputFile = "./input.txt"

readFile = fs.readFileSync(inputFile, 'utf-8');

// Keep running the simulation until we pass thorugh unscathed
for (let y = 0; ; y++) {

  let firewalls = readFile
      .trim()
      .split('\n')
      .map( line => { return line.split(': '); })
      .map( line => { return line = new Firewall(line[0], line[1]) });

  // Move the firewalls the number of sims we've done
  for (firewall of firewalls) {
    firewall.move(y);
  }

  let frogger = new Frogger();

  // Loop until after the layer of the last firewall
  for (let x = 0; x < firewalls[firewalls.length - 1].layer + 2; x++) {
    passTime(firewalls, frogger);
    if (frogger.caught === true) { break; }
  }

  console.log(y, frogger);
  if (frogger.caught === false) {
    console.log(y, frogger);
    break;
  }
}

module.exports = {
  Firewall
};


