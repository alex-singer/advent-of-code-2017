const fs = require("fs");
const inputFile = "./input.txt";

class Node {
  constructor(name, weight, children =[]) {
    this.name = name;
    this.weight = weight;
    this.children = children;
    this.parent;
  }

  findParent(nodes) {
    for (node of nodes) {
      if (node.children && node.children.includes(this.name)){
        this.parent = node.name;
        return true;
      }
    }
    return false;
  }
}

fs.readFile(inputFile, 'utf-8', (err, data) => {

  let nodes = [];

  for (line of data.split('\n')) {
    if (line) {
      let name = line.split(' ')[0];
      let weight = line.match(/\(([^)]+)\)/g)[0].slice(1,-1);
      let children = [];
      try {
        children = line.match(/->.*/g)[0].match(/[a-z]{1,}/g);
      } catch {};
      let node = new Node(name, weight, children);
      nodes.push(node);
    }
  }

  for (node of nodes) {
    node.findParent(nodes);
  }

  console.log(nodes);
});
