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

let dish = [];
for (let i = 0; i < input.length; i++) {
  dish.push(input[i].split(""));
}

const print = (arr) => {
  arr.forEach((l) => console.log(l.join("")));
};

const rotate = (arr) => {
  return arr[0].map((val, index) => arr.map((row) => row[index]).reverse());
};

const tilt = (d) => {
  for (let r = 0; r < d.length; r++) {
    for (let c = 0; c < d[0].length; c++) {
      if (d[r][c] === "O") {
        let hasGap = false;
        for (let i = r - 1; i >= 0; i--) {
          if (d[i][c] === ".") {
            hasGap = true;
          }
          // shift rock up
          if (d[i][c] === "#" || d[i][c] === "O") {
            if (hasGap) {
              d[i + 1][c] = "O";
              d[r][c] = ".";
            }
            break;
          } else if (i === 0) {
            d[i][c] = "O";
            d[r][c] = ".";
          }
        }
      }
    }
  }
};

let load = 0;

const cycle = () => {
  // N
  tilt(dish);
  // W
  dish = rotate(dish);
  tilt(dish);
  // S
  dish = rotate(dish);
  tilt(dish);
  // E
  dish = rotate(dish);
  tilt(dish);
  dish = rotate(dish);
};

const originalDish = [];
for (let r = 0; r < dish.length; r++) {
  originalDish.push([]);
  for (let c = 0; c < dish[0].length; c++) {
    originalDish[r].push(dish[r][c]);
  }
}

const cache = {};
const NUM_CYCLES = 1000000000;
let cyclesLeft = 0;
for (let i = 1; i <= NUM_CYCLES; i++) {
  cycle();
  const key = dish.join("");
  if (cache[key]) {
    console.log("repeated cycle detected", i, cache[key]);
    cyclesLeft = (NUM_CYCLES - cache[key]) % (i - cache[key]);
    console.log("cycles left: ", cyclesLeft);
    break;
  } else {
    cache[key] = i;
  }
}

for (let i = 0; i < cyclesLeft; i++) {
  cycle();
}

// print(dish);

for (let r = 0; r < dish.length; r++) {
  for (let c = 0; c < dish[0].length; c++) {
    load += dish[r][c] === "O" ? dish.length - r : 0;
  }
}
console.log(load);
