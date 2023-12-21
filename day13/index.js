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

const patterns = [];
let currPattern = [];
for (let i = 0; i < input.length; i++) {
  if (input[i] !== "") {
    currPattern.push(input[i]);
  } else {
    patterns.push(currPattern);
    currPattern = [];
  }
}
patterns.push(currPattern);

const transpose = (arr) => {
  const result = Array(arr[0].length).fill("");
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      result[j] += arr[i][j];
    }
  }
  return result;
};

// index = index of line of reflection
const hasReflection = (pattern, index) => {
  let smudge = { x: -1, y: -1 };
  for (let i = index - 1, j = index; i >= 0 && j < pattern.length; i--, j++) {
    const pi = pattern[i];
    const pj = pattern[j];
    for (let k = 0; k < pi.length; k++) {
      if (pi[k] !== pj[k]) {
        if (smudge.x < 0) {
          smudge = { x: k, y: i };
        } else {
          // already fixed smudge, no reflection
          return false;
        }
      }
    }
  }
  return smudge.x >= 0;
};

let sum = 0;
for (const pattern of patterns) {
  // check horizontal
  for (let i = 1; i < pattern.length; i++) {
    if (hasReflection(pattern, i)) {
      sum += i * 100;
    }
  }

  const tPattern = transpose(pattern);

  // check vertical
  for (let i = 1; i < tPattern.length; i++) {
    if (hasReflection(tPattern, i)) {
      sum += i;
    }
  }
}

console.log(sum);
