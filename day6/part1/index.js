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

const timings = input[0]
  .split(":")[1]
  .split(" ")
  .filter((x) => x !== "")
  .map((x) => Number(x));

const distances = input[1]
  .split(":")[1]
  .split(" ")
  .filter((x) => x !== "")
  .map((x) => Number(x));

const getDistTravelled = (duration, secondsHeld) => {
  const speed = secondsHeld;
  return (duration - secondsHeld) * speed;
};

const getNumWays = (duration, maxDist) => {
  let numWays = 0;
  for (let i = 1; i < maxDist; i++) {
    const dist = getDistTravelled(duration, i);
    if (dist > maxDist) {
      numWays++;
    }
  }
  return numWays;
};

let result = 1;
for (let i = 0; i < timings.length; i++) {
  const numWays = getNumWays(timings[i], distances[i]);
  result *= numWays;
}

console.log(result);
