var fs = require("fs");

let input = [];
try {
  const data = fs
    .readFileSync("in1.txt", "utf8")
    .split(/\r?\n/)
    .forEach(function (line) {
      input.push(line);
    });
} catch (e) {
  console.log("Error:", e.stack);
}

const hands = input.map((x) => x.split(" ")[0]);
const bids = input.map((x) => x.split(" ")[1]);

const count = (arr, elem) => {
  return arr.filter((x) => x === elem).length;
};

const isFiveOfAKind = (cards) => {
  return count(cards, cards[0]) === 5;
};

const isFourOfAKind = (cards) => {
  for (const card of cards) {
    if (count(cards, card) === 4) {
      return true;
    }
  }
  return false;
};

const isFullHouse = (cards) => {
  for (const card of cards) {
    if (count(cards, card) !== 3 && count(cards, card) !== 2) {
      return false;
    }
  }
  return true;
};

const isThreeOfAKind = (cards) => {
  for (const card of cards) {
    if (count(cards, card) !== 3 && count(cards, card) !== 1) {
      return false;
    }
  }
  return true;
};

const isTwoPair = (cards) => {
  let numPairs = 0;
  for (const card of cards) {
    if (count(cards, card) === 2) {
      numPairs++;
    }
  }
  return numPairs === 4;
};

const isOnePair = (cards) => {
  let numPairs = 0;
  for (const card of cards) {
    if (count(cards, card) === 2) {
      numPairs++;
    } else if (count(cards, card) !== 1) {
      return false;
    }
  }
  return numPairs === 2;
};

const isHighCard = (cards) => {
  for (const card of cards) {
    if (count(cards, card) !== 1) {
      return false;
    }
  }
  return true;
};

const findRank = (hand) => {
  const cards = hand.split("");
  if (isFiveOfAKind(cards)) return 5;
  if (isFourOfAKind(cards)) return 4;
};

findRank("A8637");
