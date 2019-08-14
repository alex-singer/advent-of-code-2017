fs = require("fs");

class Point {
  constructor(value, x, y) {
    this.value = value;
    this.x = x;
    this.y = y;
  }
}

function findValue(point, array) {
  var value = 0;
  for (var element of array) {
    if (typeof element === 'undefined') { break; }

    if (element.x === point.x + 1 && element.y === point.y + 0) {
      value += element.value;
    }

    if (element.x === point.x + 0 && element.y === point.y + 1) {
      value += element.value;
    }

    if (element.x === point.x - 1 && element.y === point.y + 1) {
      value += element.value;
    }

    if (element.x === point.x - 1 && element.y === point.y + 0) {
      value += element.value;
    }

    if (element.x === point.x - 1 && element.y === point.y - 1) {
      value += element.value;
    }

    if (element.x === point.x + 0 && element.y === point.y - 1) {
      value += element.value;
    }

    if (element.x === point.x + 1 && element.y === point.y - 1) {
      value += element.value;
    }

    if (element.x === point.x + 1 && element.y === point.y + 1) {
      value += element.value;
    }
  }

  return value;
}

// Read in input number
fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) throw err;

  var array = [];
  var round = 1;
  var value = 0;

  var tmpPoint = new Point(1, 0, 0);
  array.push(tmpPoint);
  console.log(tmpPoint);

  // Create an array of value, coordinate objects up until the input number
  // Access port is at (0,0)
  // Loop as long as the value is less than the input.
  // Loop will actually run once per round
  for (;value < data;) {
    var tmpX = round;
    var tmpY = (round * -1) + 1;

    // loop y to round
    for (; tmpY < round; tmpY++) {
      var tmpPoint = new Point(value, tmpX, tmpY);
      tmpPoint.value = findValue(tmpPoint, array);
      value = tmpPoint.value;
      array.push(tmpPoint);
      console.log(tmpPoint);
    }
    // loop x to -round
    for (; tmpX > round * -1; tmpX--) {
      var tmpPoint = new Point(value, tmpX, tmpY);
      tmpPoint.value = findValue(tmpPoint, array);
      value = tmpPoint.value;
      array.push(tmpPoint);
      console.log(tmpPoint);
    }
    // loop y to -round
    for (; tmpY > round * -1; tmpY--) {
      var tmpPoint = new Point(value, tmpX, tmpY);
      tmpPoint.value = findValue(tmpPoint, array);
      value = tmpPoint.value;
      array.push(tmpPoint);
      console.log(tmpPoint);
    }
    // loop x to round
    for (; tmpX < round; tmpX++) {
      var tmpPoint = new Point(value, tmpX, tmpY);
      tmpPoint.value = findValue(tmpPoint, array);
      value = tmpPoint.value;
      array.push(tmpPoint);
      console.log(tmpPoint);
    }
    // loop y to -round
    for (; tmpY <= round * -1 ; tmpY++) {
      var tmpPoint = new Point(value, tmpX, tmpY);
      tmpPoint.value = findValue(tmpPoint, array);
      value = tmpPoint.value;
      array.push(tmpPoint);
      console.log(tmpPoint);
    }

    // increment round to show we're one further from access
    round++;
  }

  console.log(Math.abs(array[data - 2].x) + Math.abs(array[data - 2].y));
}); 



// Determine the Manhattan Distance by adding the 
//   absolute value of each coordinate
