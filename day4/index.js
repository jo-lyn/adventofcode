var fs = require("fs");

let cards = [];
try {
  const data = fs
    .readFileSync("in.txt", "utf8")
    .split(/\r?\n/)
    .forEach(function (line) {
      cards.push(line);
    });
} catch (e) {
  console.log("Error:", e.stack);
}

const addPoints = (points) => {
  if (points === 0) {
    return 1;
  }
  return points * 2;
};

// let sum = 0;
// for (let i = 0; i < cards.length; i++) {
//   const [card, numbers] = cards[i].split(":");
//   const [winningNumbersStr, myNumbersStr] = numbers.split("|");
//   const winningNumbers = winningNumbersStr.split(" ").filter((x) => x !== "");
//   const myNumbers = myNumbersStr.split(" ").filter((x) => x !== "");

//   let points = 0;
//   for (const num of myNumbers) {
//     if (winningNumbers.includes(num)) {
//       points = addPoints(points);
//     }
//   }

//   sum += points;
// }

// console.log(sum);

// key = card number, value = array of cards copied
let copies = {};

for (let i = 0; i < cards.length; i++) {
  copies[i + 1] = 1;
}

for (let i = 0; i < cards.length; i++) {
  const [card, numbers] = cards[i].split(":");
  const [winningNumbersStr, myNumbersStr] = numbers.split("|");
  const winningNumbers = winningNumbersStr.split(" ").filter((x) => x !== "");
  const myNumbers = myNumbersStr.split(" ").filter((x) => x !== "");

  let numMatches = 0;
  for (const num of myNumbers) {
    if (winningNumbers.includes(num)) {
      numMatches++;
    }
  }

  for (j = 1; j <= numMatches; j++) {
    const idx = i + 1 + j;
    copies[idx] += copies[i + 1];
  }
  //   console.log(copies);
}

let numCards = 0;
for (const key in copies) {
  numCards += copies[key];
}

console.log(numCards);
