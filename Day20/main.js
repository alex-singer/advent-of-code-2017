class Particle {
  constructor (xP, xV, xA, yP, yV, yA, zP, zV, zA) {
    this.xP = xP;
    this.xV = xV;
    this.xA = xA;
    this.yP = yP;
    this.yV = yV;
    this.yA = yA;
    this.zP = zP;
    this.zV = zV;
    this.zA = zA;
    this.alive = true;
    this.distance = null;
  }

  findDistance() {
    this.distance = Math.abs(this.xP) + Math.abs(this.yP) + Math.abs(this.zP);
  }

  update() {
    this.xV += this.xA;
    this.yV += this.yA;
    this.zV += this.zA;
    this.xP += this.xV;
    this.yP += this.yV;
    this.zP += this.zV;
    this.findDistance();
  }

  collided(particles) {
    for (particle of particles) {
      // test same instance
      if (particle == this) {
      } else if (!particle.alive) {
      } else if (
          this.xP === particle.xP &&
          this.yP === particle.yP &&
          this.zP === particle.zP) {
        this.alive = false;
        particle.alive = false;
      }
    }
  }
}


if (process.argv[2]) {
  const { readFileSync } = require('fs');
  const rows = readFileSync(process.argv[2], 'utf-8').trim().split('\n');

  let particles = [];
  for (row of rows) {
    row = row.match(/-?[0-9]+/g);
    let particle = new Particle(
      parseInt(row[0], 10), parseInt(row[3], 10), parseInt(row[6], 10),
      parseInt(row[1], 10), parseInt(row[4], 10), parseInt(row[7], 10),
      parseInt(row[2], 10), parseInt(row[5], 10), parseInt(row[8], 10));
    particles.push(particle);
  }

  let sameLowest = 0;
  let prevLowest = 0;
  let lowestIndex = 0;

  while (sameLowest < 10000) {
    prevLowest = lowestIndex;
    for (particle of particles) {
      if (particle.alive) {
        particle.update();
      }
    }
    for (particle of particles) {
      if (particle.alive) {
        particle.collided(particles);
      }
    }
    for (let x = 0; x < particles.length; x++) {
      if (particles[x].alive && particles[x].distance < particles[lowestIndex].distance) {
        lowestIndex = x;
      } 
    }
    if (prevLowest === lowestIndex) {
      sameLowest++;
    }
  }
  console.log(particles.filter(x => x.alive).length);
}

