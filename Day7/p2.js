const fs = require("fs");
const inputFile = "./testInput.txt";

class Node {
  constructor(name, weight, children =[]) {
    this.name = name;
    this.weight = parseInt(weight, 10);
    this.children = children;
    this.parent;
    this.totalWeight = 0;
  }

  findChildrenAsNodes(nodes) {
    let children = [];
    for (node of nodes) {
      if (this.children.includes(node.name)) {
        children.push(node);
      }
    }
    this.children = children;
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

  findTotalWeight(nodes) {
    if (this.totalWeight != 0) { 
      return false; 
    }

    if (!this.children[0]) {
      this.totalWeight = this.weight;
      return true;
    } else {
      for (let child of this.children) {
        if (child.totalWeight === 0) {
          console.log(this.name, child.name);
          child.findTotalWeight(nodes);
        }
        this.totalWeight += parseInt(child.totalWeight, 10);
      }
      this.totalWeight += this.weight;
    }
    return true;
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

  for (node of nodes) {
    node.findChildrenAsNodes(nodes);
  }

  for (node of nodes) {
    node.findTotalWeight(nodes);
  }

  for (node of nodes) {
    if (node.children.length > 0) {
      let match = node.children[0].totalWeight;
      for (let child of node.children) {
        if (child.totalWeight != match) {
          console.log(node);
        }
      }
    }
  }
      
  for (node of nodes) {
    //console.log(node);
  }
});
