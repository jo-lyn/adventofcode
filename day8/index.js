var fs = require("fs");

let input = [];
try {
  const data = fs
    .readFileSync("in.txt", "utf8")
    .split(/\r?\n/)
    .forEach(function (line) {
      input.push(line);
    });
} catch (e) {
  console.log("Error:", e.stack);
}

const instructions = input[0];
const map = {};

for (let i = 2; i < input.length; i++) {
  const [key, values] = input[i].split("=");
  const keyNode = key.trim();
  const leftNode = values.split(",")[0].slice(2);
  const rightNode = values.split(",")[1].slice(1, 4);
  map[keyNode] = [leftNode, rightNode];
}

let nodes = [];
for (const key in map) {
  if (key[2] === "A") {
    nodes.push(key);
  }
}

let numSteps = [];
for (let i = 0; i < nodes.length; i++) {
  numSteps.push(0);
  //   console.log("NODE: ", nodes[i]);
  while (nodes[i][2] !== "Z") {
    for (const instruction of instructions) {
      nodes[i] = map[nodes[i]][instruction === "L" ? 0 : 1];
      //   console.log(nodes[i], nodes[i][2] !== "Z");
      numSteps[i]++;
    }
  }
}

console.log(numSteps);

const gcd = (a, b) => {
  if (b === 0) return a;
  return gcd(b, a % b);
};

const lcm = (arr) => {
  let result = arr[0];

  for (let i = 1; i < arr.length; i++) {
    result = (result * arr[i]) / gcd(result, arr[i]);
  }

  return result;
};

console.log(lcm(numSteps));
