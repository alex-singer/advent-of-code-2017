fs = require("fs");

class Point {
  constructor(value, x, y) {
    this.value = value;
    this.x = x;
    this.y = y;
  }
}

/*
1,0
1,1
0,1
1,1

1,0
1,1
0,1
1,1

x = round
y = 0
loop y to round
loop x to -round
loop y to -round
loop x to round
loop y to -1

2,0
2,1
2,2
1,2
0,2
-1,2
-2,2
-2,1

-2,0
-2,-1
-2,-2
-1,-2
0,-2
1,-2
2,-2
2,-1

*/


// Read in input number
fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) throw err;

  var array = [];
  var value = 2;
  var round = 1;

  // Create an array of value, coordinate objects up until the input number
  // Access port is at (0,0)
  // Loop as long as the value is less than the input.
  // Loop will actually run once per round
  for (; value < data;) {
    var tmpX = round;
    var tmpY = (round * -1) + 1;

    // loop y to round
    for (; tmpY < round; tmpY++) {
      var tmpPoint = new Point(value, tmpX, tmpY);
      value++;
      array.push(tmpPoint);
      console.log(tmpPoint);
    }
    // loop x to -round
    for (; tmpX > round * -1; tmpX--) {
      var tmpPoint = new Point(value, tmpX, tmpY);
      value++;
      array.push(tmpPoint);
      console.log(tmpPoint);
    }
    // loop y to -round
    for (; tmpY > round * -1; tmpY--) {
      var tmpPoint = new Point(value, tmpX, tmpY);
      value++;
      array.push(tmpPoint);
      console.log(tmpPoint);
    }
    // loop x to round
    for (; tmpX < round; tmpX++) {
      var tmpPoint = new Point(value, tmpX, tmpY);
      value++;
      array.push(tmpPoint);
      console.log(tmpPoint);
    }
    // loop y to -round
    for (; tmpY <= round * -1 ; tmpY++) {
      var tmpPoint = new Point(value, tmpX, tmpY);
      value++;
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
