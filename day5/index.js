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

const processMapIntoArray = (idx) => {
  let result = [];
  let i = idx;
  while (i < input.length && input[i] !== "") {
    const nums = input[i]
      .split(" ")
      .filter((x) => !isNaN(Number(x)))
      .map((x) => Number(x));
    result.push(nums);
    i++;
  }
  return { result, end: i };
};

let maps = [];
let i = 2;
while (i < input.length) {
  if (input[i].includes("map")) {
    i++; // skip to line after map header
    const { result, end } = processMapIntoArray(i);
    maps.push(result);
    i = end;
  } else {
    i++;
  }
}

const findDest = (num) => {
  let curr = num;
  for (const map of maps) {
    let found = false;
    //   let result = seed;
    for (const line of map) {
      const dest = line[0];
      const source = line[1];
      const range = line[2];

      //   console.log({ dest, source, range });
      if (curr >= source && curr <= source + range) {
        found = true;
        curr = curr - source + dest;
        // console.log("found: ", curr);
        break;
      }
    }
  }
  return curr;
};

const seedData = input[0].split(" ").filter((x) => !isNaN(Number(x)));
let seeds = [];
let min = -1;

for (let i = 0; i < seedData.length - 1; i += 2) {
  const currSeed = Number(seedData[i]);
  const currRange = Number(seedData[i + 1]);
  for (let j = 0; j < currRange; j++) {
    // seeds.push(currSeed + j);

    const dest = findDest(currSeed + j);
    // console.log({ curr: currSeed + j, dest });
    min = min < 0 ? dest : Math.min(min, dest);
  }
}

console.log(min);

// let min = -1;
// for (const seed of seeds) {
//   const dest = findDest(seed);
//   console.log({ seed, dest });
//   min = min < 0 ? dest : Math.min(min, dest);
//   //   max = Math.max(max, findDest(seed));
// }
