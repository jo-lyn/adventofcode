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
console.log(map[0].length);

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

for (let i = 0; i < emptyColumns.length; i++) {
  const col = emptyColumns[i];
  for (let row = 0; row < map.length; row++) {
    map[row].splice(col + i, 0, ".");
  }
}

let spaceRow = [];
for (let i = 0; i < map[0].length; i++) {
  spaceRow.push(".");
}
for (let i = 0; i < emptyRows.length; i++) {
  const row = emptyRows[i];
  map.splice(row + i, 0, spaceRow);
}

const same = (pos1, pos2) => {
  return pos1[0] === pos2[0] && pos1[1] === pos2[1];
};

const getNeighbors = (pos) => {
  const res = [
    [pos[0] - 1, pos[1]],
    [pos[0] + 1, pos[1]],
    [pos[0], pos[1] - 1],
    [pos[0], pos[1] + 1],
  ];

  return res.filter(
    (n) => n[0] >= 0 && n[1] >= 0 && n[1] < map.length && n[0] < map[0].length
  );
};

const visited = [];
for (let i = 0; i < map.length; i++) {
  visited.push([]);
  for (let j = 0; j < map[i].length; j++) {
    visited[i].push(0);
  }
}

const shortestPath = (source, dest) => {
  const queue = [{ pos: source, count: 0 }];
  const result = [];
  let currNode;
  let max = 0;

  while (!currNode || (queue.length && !same(currNode.pos, dest))) {
    currNode = queue.shift();
    const x = currNode.pos[0];
    const y = currNode.pos[1];

    if (visited[y][x] === 0) {
      visited[y][x] = currNode.count;
      //   visited[y][x] = 0;
      max = Math.max(max, currNode.count);
      result.push(currNode.pos);

      const neighbors = getNeighbors([x, y]);
      for (const n of neighbors) {
        queue.push({ pos: n, count: currNode.count + 1 });
      }
    }
  }

  return currNode;
};

// console.log(shortestPath([3, 0], [7, 1]));
console.log(map[0].length);

const galaxies = [];
const pairs = [];
for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    // console.log(j, map[j]);
    if (map[j][i] === "#") {
      galaxies.push([i, j]);
    }
  }
}

console.log({ galaxies });

// console.log(visited);
// console.log(same([7, 1], [7, 1]));
