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

const duration = input[0]
  .split(":")[1]
  .split(" ")
  .filter((x) => x !== "")
  .map((x) => Number(x))[0];

const maxDist = input[1]
  .split(":")[1]
  .split(" ")
  .filter((x) => x !== "")
  .map((x) => Number(x))[0];

const getDistTravelled = (duration, secondsHeld) => {
  const speed = secondsHeld;
  return (duration - secondsHeld) * speed;
};

let numWays = 0;
// for (let i = 1; i < maxDist; i++) {
//   const dist = getDistTravelled(duration, i);
//   if (dist > maxDist) {
//     numWays++;
//   }
// }

let left = 1;
let right = duration;
let minX = 0;
while (left <= right) {
  const middle = Math.floor((left + right) / 2);
  const dist = getDistTravelled(duration, middle);
  if (dist > maxDist) {
    minX = middle;
    right = middle - 1;
  } else {
    left = middle + 1;
  }
}

left = 1;
right = duration;
let maxX = 0;
while (left <= right) {
  const middle = Math.floor((left + right) / 2);
  const dist = getDistTravelled(duration, middle);
  if (dist > maxDist) {
    maxX = middle;
    left = middle + 1;
  } else {
    right = middle - 1;
  }
}

console.log({ minX, maxX, res: maxX - minX + 1 });
