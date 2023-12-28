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
console.log(sequences);

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

let sum = 0;
for (let seq of sequences) {
  sum += hash(seq);
}

console.log(sum);
