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

const sequences = [];
for (const line of input) {
  const res = line.split(",").filter((x) => x !== "");
  sequences.push(...res);
}

const hash = (s) => {
  let res = 0;
  for (let i = 0; i < s.length; i++) {
    const code = s.charCodeAt(i);
    res += code;
    res *= 17;
    res %= 256;
  }
  return res;
};

// value = {label, length}
let boxes = [];
// key = lens label; value = { boxNum, slotNum}
let lensToBoxMap = {};
for (let i = 0; i < 256; i++) {
  boxes.push([]);
}

for (let seq of sequences) {
  let [label, length] = seq.split("=");
  if (!length) {
    label = seq.split("-")[0];
  }
  const boxNum = hash(label);
  const cachedLens = lensToBoxMap[label];

  // add lens
  if (length) {
    if (cachedLens) {
      boxes[boxNum][cachedLens.slotNum] = { label, length };
    } else {
      lensToBoxMap[label] = { boxNum, slotNum: boxes[boxNum].length };
      boxes[boxNum].push({ label, length });
    }
  } else {
    // remove lens
    if (cachedLens) {
      const { slotNum } = lensToBoxMap[label];
      boxes[boxNum].splice(slotNum, 1);
      delete lensToBoxMap[label];
      for (let i = slotNum; i < boxes[boxNum].length; i++) {
        lensToBoxMap[boxes[boxNum][i].label].slotNum = i;
      }
    }
  }
}

// console.log(boxes);

let sum = 0;
for (let i = 0; i < boxes.length; i++) {
  for (let j = 0; j < boxes[i].length; j++) {
    sum += (i + 1) * (j + 1) * boxes[i][j].length;
  }
}

console.log(sum);
