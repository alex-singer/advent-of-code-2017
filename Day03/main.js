class Point {
  constructor(value, x, y) {
    this.value = value;
    this.x = x;
    this.y = y;
  }
}

/**
 * Sums the values of all surrounding points and return the sum.
 * @param {int} x - The x coordinate value of the point.
 * @param {int} y - The y coordinate value of the point.
 * @param {array} array - The array of Points.
 * @returns - The sum of all surrounding values.
 */
function findValue(x, y, array) {
  var value = 0;
  for (var element of array) {
    if (typeof element === 'undefined') { break; }

    if (element.x === x + 1 && element.y === y + 0) {
      value += element.value;
    }

    if (element.x === x + 0 && element.y === y + 1) {
      value += element.value;
    }

    if (element.x === x - 1 && element.y === y + 1) {
      value += element.value;
    }

    if (element.x === x - 1 && element.y === y + 0) {
      value += element.value;
    }

    if (element.x === x - 1 && element.y === y - 1) {
      value += element.value;
    }

    if (element.x === x + 0 && element.y === y - 1) {
      value += element.value;
    }

    if (element.x === x + 1 && element.y === y - 1) {
      value += element.value;
    }

    if (element.x === x + 1 && element.y === y + 1) {
      value += element.value;
    }
  }

  return value;
}


function main(data) {

  let array = [];
  let round = 1;
  let value = 0;

  // Preload the first entry point with a value of one
  array.push(new Point(1, 0, 0));

  // Loop will run once per loop around the access point 
  //  stopping at the end of the loop where the value greater than the input
  //  is found
  // The round refers to the number of circles from the access point
  while(value < data) {
    var tmpX = round;
    var tmpY = (round * -1) + 1;
   
    // loop y to round
    for (; tmpY < round && array[array.length-1].value < data; tmpY++) {
      array.push(new Point(findValue(tmpX, tmpY, array), tmpX, tmpY));
    } 
    if (array[array.length-1].value > data) { break; }

    // loop x to -round
    for (; tmpX > round * -1 && array[array.length-1].value < data; tmpX--) {
      array.push(new Point(findValue(tmpX, tmpY, array), tmpX, tmpY));
    }
    if (array[array.length-1].value > data) { break; }

    // loop y to -round
    for (; tmpY > round * -1 && array[array.length-1].value < data; tmpY--) {
      array.push(new Point(findValue(tmpX, tmpY, array), tmpX, tmpY));
    }
    if (array[array.length-1].value > data) { break; }

    // loop x to round
    for (; tmpX < round && array[array.length-1].value < data; tmpX++) {
      array.push(new Point(findValue(tmpX, tmpY, array), tmpX, tmpY));
    }
    if (array[array.length-1].value > data) { break; }

    // loop y to -round
    for (; tmpY <= round * -1  && array[array.length-1].value < data; tmpY++) {
      array.push(new Point(findValue(tmpX, tmpY, array), tmpX, tmpY));
    }
    if (array[array.length-1].value > data) { break; }

    round++;
  }

  return array[array.length-1].value;
}

if (process.argv[2]) {

  const {readFileSync} = require('fs');
  let input = readFileSync(process.argv[2], 'utf8').trim();

  console.log(main(input));
}

module.exports = {
  main,
  Point,
  findValue
};
