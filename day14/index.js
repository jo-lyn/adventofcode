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
for (let c = 0; c < input[0].length; c++) {
  // index = row num; value = 1 if there is rock, 0 if no rock
  // add dummy idx 0 for easier calculation
  let rocks = Array(input.length + 1).fill(0);
  let currCubeRow = -1;
  let currRockRow = input[0].length;

  for (let r = 0; r < input.length; r++) {
    const n = input[r][c];
    const row = input[0].length - r;
    if (n === "#") {
      currCubeRow = row;
    } else if (n === "O") {
      if (currCubeRow >= 0) {
        currRockRow = currCubeRow - 1;
        currCubeRow = -1;
      }
      //   console.log({ currCubeRow, currRockRow, row });
      rocks[currRockRow] = 1;
      currRockRow--;
    }
  }

  // calculate load
  for (let i = 0; i < rocks.length; i++) {
    load += i * rocks[i];
  }
}

console.log(load);
