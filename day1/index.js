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

const digits = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  //   "1",
  //   "2",
  //   "3",
  //   "4",
  //   "5",
  //   "6",
  //   "7",
  //   "8",
  //   "9",
];

const numMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const isDigit = (n) => !isNaN(Number(n));

const findCalibrationValue = (s) => {
  let firstDigit = -1;
  let lastDigit = -1;

  for (let i = 0; i < s.length; i++) {
    if (isDigit(s[i])) {
      if (firstDigit < 0) {
        firstDigit = s[i];
        lastDigit = s[i];
      } else {
        lastDigit = s[i];
      }
    }
  }

  return `${firstDigit}${lastDigit}`;
};

let newInput = [];
for (let i = 0; i < input.length; i++) {
  const line = input[i];
  let newLine = line;
  for (let j = 0; j < digits.length; j++) {
    newLine = newLine.replaceAll(
      digits[j],
      `${digits[j]}${numMap[digits[j]]}${digits[j]}`
    );
    console.log(newLine);
  }
  newInput.push(newLine);
}

let sum = 0;
for (let i = 0; i < newInput.length; i++) {
  const value = findCalibrationValue(newInput[i]);
  sum += Number(value);
}

console.log(sum);
