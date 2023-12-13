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

let report = [];
for (const line of input) {
  const nums = line.split(" ");
  report.push(nums.map((x) => Number(x)));
}

const extrapolate = (values, currResult) => {
  const result = [];
  let allZero = true;
  //   console.log({ values, currResult });
  for (let i = 1; i < values.length; i++) {
    const diff = values[i] - values[i - 1];
    result.push(diff);
    if (diff !== 0) {
      allZero = false;
    }
  }
  const nextValue = currResult + values[values.length - 1];
  if (allZero) {
    return nextValue;
  }

  return extrapolate(result, nextValue);
};

// let result = 0;
// for (const values of report) {
//   result += extrapolate(values, 0);
// }

const extrapolateBack = (values) => {
  const result = [];
  let allZero = true;
  //   console.log({ values, currResult });
  for (let i = 1; i < values.length; i++) {
    const diff = values[i] - values[i - 1];
    result.push(diff);
    if (diff !== 0) {
      allZero = false;
    }
  }
  if (allZero) {
    return values[0];
  }
  return values[0] - extrapolateBack(result);
};

let result = 0;
for (const values of report) {
  result += extrapolateBack(values);
}
console.log(result);
