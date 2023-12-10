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

const hands = input.map((x) => x.split(" ")[0].split(""));
const bids = input.map((x) => Number(x.split(" ")[1]));

const handBidMap = {};
for (let i = 0; i < hands.length; i++) {
  handBidMap[hands[i]] = bids[i];
}

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
  let numThrees = 0;
  for (const card of cards) {
    if (count(cards, card) === 3) {
      numThrees++;
    }
    if (count(cards, card) !== 3 && count(cards, card) !== 1) {
      return false;
    }
  }
  return numThrees === 3;
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

const getHandStrength = (hand) => {
  if (isFiveOfAKind(hand)) return 7;
  if (isFourOfAKind(hand)) return 6;
  if (isFullHouse(hand)) return 5;
  if (isThreeOfAKind(hand)) return 4;
  if (isTwoPair(hand)) return 3;
  if (isOnePair(hand)) return 2;
  if (isHighCard(hand)) return 1;
  return 1;
};

const cardStrengthMap = {
  T: 10,
  J: 1,
  Q: 12,
  K: 13,
  A: 14,
};

const getCardStrength = (card) => {
  if (isNaN(Number(card))) {
    return cardStrengthMap[card];
  } else {
    return Number(card);
  }
};

const transformHand = (hand) => {
  const cardCountMap = {};
  for (const card of hand) {
    if (cardCountMap[card]) {
      cardCountMap[card]++;
    } else {
      cardCountMap[card] = 1;
    }
  }

  const tuples = Object.keys(cardCountMap).map((key) => [
    key,
    cardCountMap[key],
  ]);

  // sort strength in desc order
  tuples.sort((a, b) => {
    if (a[0] === "J") {
      return 1;
    } else if (b[0] === "J") {
      return -1;
    }

    const count1 = a[1];
    const count2 = b[1];
    if (count1 === count2) {
      const strength1 = getCardStrength(a[0]);
      const strength2 = getCardStrength(b[0]);
      if (strength1 > strength2) {
        return -1;
      } else {
        return 1;
      }
    } else {
      return count2 - count1;
    }
  });

  const bestCard = tuples[0][0];
  // console.log({ hand, bestCard, tuples });

  let result = [];
  for (const card of hand) {
    if (card === "J") {
      result.push(bestCard);
    } else {
      result.push(card);
    }
  }

  return result;
};

const compareStrength = (hand1, hand2) => {
  const strength1 = getHandStrength(transformHand(hand1));
  const strength2 = getHandStrength(transformHand(hand2));

  // console.log({
  //   strength1,
  //   strength2,
  //   hand1: transformHand(hand1),
  //   hand2: transformHand(hand2),
  // });

  if (strength1 < strength2) {
    return -1;
  } else if (strength1 > strength2) {
    return 1;
  } else {
    for (let i = 0; i < hand1.length; i++) {
      if (getCardStrength(hand1[i]) < getCardStrength(hand2[i])) {
        return -1;
      } else if (getCardStrength(hand1[i]) > getCardStrength(hand2[i])) {
        return 1;
      }
    }
    console.error("Invalid input, same hand: ", hand1, hand2);
    return 0;
  }
};

// const test = ["Q2KJJ".split(""), "KK677".split("")];
// test.sort(compareStrength);
// console.log(test);

hands.sort(compareStrength);
// console.log(hands);

let result = 0;
for (let i = 0; i < hands.length; i++) {
  result += (i + 1) * handBidMap[hands[i]];
}

console.log(result);
