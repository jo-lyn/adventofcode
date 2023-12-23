var fs = require("fs");

let input = [];
try {
  const data = fs
    .readFileSync("in1.txt", "utf8")
    .split(/\r?\n/)
    .forEach(function (line) {
      input.push(line);
    });
} catch (e) {
  console.log("Error:", e.stack);
}

let load = 0;
for (let col = 0; col < input[0].length; col++) {
  // index = row num; value = number of rounded-rocks
  let rounds = Array(input.length).fill(0);
  // positions of cubed-rocks
  let cubes = [];

  for (let row = 0; row < input.length; row++) {
    const n = input[row][col];
    if (n === "#") {
      cubes.push({ row, col });
    } else if (n === "O") {
      rounds[cubes.length]++;
    }
  }

  // calculate load
  for (let i = 0; i < rounds.length; i++) {
    const d = input.length - cubes[i - 1].row;
    console.log(d);
    load += d * rounds[i];
  }
}
