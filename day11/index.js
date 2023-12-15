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

let map = [];
for (let i = 0; i < input.length; i++) {
  map.push(input[i].split(""));
}

let emptyRows = [];
let emptyColumns = [];
for (let i = 0; i < map.length; i++) {
  let isEmptyRow = true;
  let isEmptyColumn = true;
  for (let j = 0; j < map[i].length; j++) {
    if (map[j][i] === "#") {
      isEmptyColumn = false;
    }
    if (map[i][j] === "#") {
      isEmptyRow = false;
    }
  }
  if (isEmptyRow) {
    emptyRows.push(i);
  }
  if (isEmptyColumn) {
    emptyColumns.push(i);
  }
}

let galaxies = [];
for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[0].length; j++) {
    if (map[i][j] === "#") {
      galaxies.push([i, j]);
    }
  }
}

console.log({ galaxies });

const getNewPos = (pos) => {
  let x = pos[0];
  let y = pos[1];

  for (let i = 0; i < emptyColumns.length; i++) {
    // console.log({ x, zz: emptyColumns[i] });
    if (x < emptyColumns[i]) {
      x += i;
      break;
    }
  }

  for (let i = 0; i < emptyRows.length; i++) {
    // console.log({ y, emptyRows });
    if (y < emptyRows[i]) {
      y += i;
      break;
    }
  }
  return [x, y];
};

const findShortestPath = (pos1, pos2) => {
  const x = Math.abs(pos2[0] - pos1[0]);
  const y = Math.abs(pos2[1] - pos1[1]);
  return x + y;
};

let sum = 0;
for (let i = 0; i < galaxies.length; i++) {
  for (let j = i + 1; j < galaxies.length; j++) {
    sum += findShortestPath(getNewPos(galaxies[i]), getNewPos(galaxies[j]));
  }
}

console.log(getNewPos([1, 7]));
console.log({ sum });
