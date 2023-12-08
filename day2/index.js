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

const colors = ["green", "red", "blue"];

const getBallData = (str) => {
  let color = "";
  let num = -1;
  colors.forEach((col) => {
    if (str.includes(col)) {
      color = col;
      const newStr = str.replace(color, "").replace(" ", "");
      num = Number(newStr);
    }
  });
  return { num, color };
};

// let result = 0;
// only 12 red cubes, 13 green cubes, and 14 blue cubes
// for (let i = 0; i < input.length; i++) {
//   const [game, setsLine] = input[i].split(":");
//   const sets = setsLine.split(";");
//   const gameId = Number(game.replace("Game ", ""));

//   let isValid = true;
//   for (let j = 0; j < sets.length; j++) {
//     const balls = sets[j].split(",");
//     for (let k = 0; k < balls.length; k++) {
//       const { num, color } = getBallData(balls[k]);
//       console.log({ result, num, color });
//       switch (color) {
//         case "blue":
//           if (num > 14) {
//             isValid = false;
//           }
//           break;
//         case "red":
//           if (num > 12) {
//             isValid = false;
//           }
//           break;
//         case "green":
//           if (num > 13) {
//             isValid = false;
//           }
//           break;
//         default:
//           break;
//       }
//     }
//   }
//   if (isValid) {
//     result += gameId;
//   }
// }

let sum = 0;
for (let i = 0; i < input.length; i++) {
  const [game, setsLine] = input[i].split(":");
  const sets = setsLine.split(";");

  let power = 0;
  let maxRed = 0;
  let maxBlue = 0;
  let maxGreen = 0;
  for (let j = 0; j < sets.length; j++) {
    const balls = sets[j].split(",");
    for (let k = 0; k < balls.length; k++) {
      const { num, color } = getBallData(balls[k]);
      //   console.log({ num, color });
      switch (color) {
        case "blue":
          maxBlue = Math.max(num, maxBlue);
          break;
        case "red":
          maxRed = Math.max(num, maxRed);
          break;
        case "green":
          maxGreen = Math.max(num, maxGreen);
          break;
        default:
          break;
      }
    }
  }
  power = maxRed * maxBlue * maxGreen;
  //   console.log({ power, maxRed, maxBlue, maxGreen });

  sum += power;
}

console.log(sum);
