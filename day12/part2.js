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

let springList = [];
let groupList = [];
for (const line of input) {
  const springs = line.split(" ")[0];
  let res = springs;
  // unfold
  for (let i = 0; i < 4; i++) {
    res += `?${springs}`;
  }
  springList.push(`${res}.`); // add trailing '.' for easier validity check

  const groups = line
    .split(" ")[1]
    .split(",")
    .map((x) => Number(x));
  let res2 = groups;
  // unfold
  for (let i = 0; i < 4; i++) {
    res2 = res2.concat(groups);
  }
  groupList.push(res2);
}

const isValid = (springs, groups) => {
  let curr = 0;
  let res = [];
  for (const spring of springs) {
    if (spring === "." && curr > 0) {
      res.push(curr);
      curr = 0;
    } else if (spring === "#") {
      curr++;
    }
  }
  return res.toString() === groups.toString();
};

let dp = {};
// i = curr position of springs
// j = curr position of groups
// curr = curr length of block of #
const f = (springs, groups, i, j, curr) => {
  const key = `${i},${j},${curr}`;
  if (typeof dp[key] === "number") {
    return dp[key];
  }

  if (i === springs.length) {
    if (j === groups.length && curr === 0) {
      return 1;
    }
    if (j === groups.length - 1 && curr === groups[j]) {
      return 1;
    } else {
      return 0;
    }
  }

  let res = 0;
  for (const c of [".", "#"]) {
    if (springs[i] === c || springs[i] === "?") {
      if (c === "." && curr === 0) {
        res += f(springs, groups, i + 1, j, 0);
        // ending block of #
      } else if (c === "." && curr === groups[j]) {
        res += f(springs, groups, i + 1, j + 1, 0);
      } else if (c === "#") {
        res += f(springs, groups, i + 1, j, curr + 1);
      }
    }
  }

  dp[key] = res;
  return res;
};

// console.log(f(springList[5], groupList[5], 0, 0, 0));

let sum = 0;
for (let i = 0; i < springList.length; i++) {
  dp = {};
  sum += f(springList[i], groupList[i], 0, 0, 0);
}

console.log(sum);
