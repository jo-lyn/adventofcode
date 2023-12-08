var fs = require("fs");

let tiles = [];
try {
  const data = fs
    .readFileSync("in.txt", "utf8")
    .split(/\r?\n/)
    .forEach(function (line) {
      tiles.push(line);
    });
} catch (e) {
  console.log("Error:", e.stack);
}

const isDigit = (n) => !isNaN(Number(n));

const isPartNumber = (x1, x2, y, num) => {
  const minX = Math.max(0, x1 - 1);
  const maxX = Math.min(tiles[y].length - 1, x2 + 1);
  const minY = Math.max(0, y - 1);
  const maxY = Math.min(tiles.length - 1, y + 1);

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const block = tiles[y][x];
      // is symbol
      if (!isDigit(block) && block !== ".") {
        return true;
      }
    }
  }
  return false;
};

// let sum = 0;
// for (let y = 0; y < tiles.length; y++) {
//   let currDigit = "";
//   for (let x = 0; x <= tiles[y].length; x++) {
//     const block = tiles[y][x];
//     if (isDigit(block)) {
//       currDigit += block;
//     } else {
//       if (currDigit) {
//         if (isPartNumber(x - currDigit.length, x - 1, y, currDigit)) {
//           //   console.log(currDigit);
//           sum += Number(currDigit);
//         }
//       }
//       currDigit = "";
//     }
//   }
// }

// console.log(sum);

let visited = [];
const getFullDigit = (x, y) => {
  let digit = "";
  let i = x;
  while (i >= 0 && isDigit(tiles[y][i])) {
    digit = tiles[y][i] + digit;
    visited.push(`${i},${y}`);
    i--;
  }

  i = x + 1;
  while (i < tiles[y].length && isDigit(tiles[y][i])) {
    digit += tiles[y][i];
    visited.push(`${i},${y}`);
    i++;
  }

  return digit;
};

const getGearRatio = (x, y) => {
  const minX = Math.max(0, x - 1);
  const maxX = Math.min(tiles[y].length - 1, x + 1);
  const minY = Math.max(0, y - 1);
  const maxY = Math.min(tiles.length - 1, y + 1);

  let ratio = 1;
  let numDigits = 0;
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const block = tiles[y][x];
      if (isDigit(block) && !visited.includes(`${x},${y}`)) {
        const digit = getFullDigit(x, y);
        ratio *= digit;
        numDigits++;
      }
    }
  }
  visited = [];

  if (numDigits >= 2) {
    return ratio;
  }
  return -1;
};

let sum = 0;
for (let y = 0; y < tiles.length; y++) {
  let currDigit = "";
  for (let x = 0; x <= tiles[y].length; x++) {
    const block = tiles[y][x];
    if (block === "*") {
      const ratio = getGearRatio(x, y);
      if (ratio > 0) {
        sum += ratio;
      }
    }
  }
}

console.log(sum);
