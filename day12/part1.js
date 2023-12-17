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
  springList.push(line.split(" ")[0] + "."); // add trailing '.' for easier validity check
  groupList.push(
    line
      .split(" ")[1]
      .split(",")
      .map((x) => Number(x))
  );
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

const f = (springs, groups, i) => {
  if (i === springs.length) {
    return isValid(springs, groups) ? 1 : 0;
  }
  if (springs[i] === "?") {
    return (
      f(`${springs.slice(0, i)}#${springs.slice(i + 1)}`, groups, i + 1) +
      f(`${springs.slice(0, i)}.${springs.slice(i + 1)}`, groups, i + 1)
    );
  }
  return f(springs, groups, i + 1);
};

let sum = 0;
for (let i = 0; i < springList.length; i++) {
  sum += f(springList[i], groupList[i], 0);
}

console.log(sum);
