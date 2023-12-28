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

const DIR = {
  UP: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3,
};
const DIR_ROUTE = {
  [DIR.UP]: [0, -1],
  [DIR.DOWN]: [0, 1],
  [DIR.LEFT]: [-1, 0],
  [DIR.RIGHT]: [1, 0],
};

let grid = [];
let energies = [];
const visited = {};

for (let i = 0; i < input.length; i++) {
  grid.push(input[i].split(""));
}

for (let i = 0; i < grid.length; i++) {
  energies.push([]);
  for (let j = 0; j < grid[0].length; j++) {
    energies[i].push(".");
  }
}

const pewWithDir = (x, y, dir) => {
  pew(x + DIR_ROUTE[dir][0], y + DIR_ROUTE[dir][1], dir);
};

const pew = (x, y, prevDir) => {
  if (x < 0 || y < 0 || x >= grid[0].length || y >= grid.length) {
    return;
  }

  if (visited[`${x},${y}-${prevDir}`]) {
    return;
  }
  const tile = grid[y][x];
  visited[`${x},${y}-${prevDir}`] = 1;
  energies[y][x] = "#";
  switch (tile) {
    case ".":
      pewWithDir(x, y, prevDir);
      break;
    case "|":
      if (prevDir === DIR.LEFT || prevDir === DIR.RIGHT) {
        pewWithDir(x, y, DIR.UP);
        pewWithDir(x, y, DIR.DOWN);
      } else {
        pewWithDir(x, y, prevDir);
      }
      break;
    case "-":
      if (prevDir === DIR.UP || prevDir === DIR.DOWN) {
        pewWithDir(x, y, DIR.LEFT);
        pewWithDir(x, y, DIR.RIGHT);
      } else {
        pewWithDir(x, y, prevDir);
      }
      break;
    case "/":
      if (prevDir === DIR.UP) {
        pewWithDir(x, y, DIR.RIGHT);
      } else if (prevDir === DIR.DOWN) {
        pewWithDir(x, y, DIR.LEFT);
      } else if (prevDir === DIR.LEFT) {
        pewWithDir(x, y, DIR.DOWN);
      } else {
        pewWithDir(x, y, DIR.UP);
      }
      break;
    case "\\":
      if (prevDir === DIR.UP) {
        pewWithDir(x, y, DIR.LEFT);
      } else if (prevDir === DIR.DOWN) {
        pewWithDir(x, y, DIR.RIGHT);
      } else if (prevDir === DIR.LEFT) {
        pewWithDir(x, y, DIR.UP);
      } else {
        pewWithDir(x, y, DIR.DOWN);
      }
      break;
  }
};

pew(0, 0, DIR.RIGHT);

// console.log(energies.forEach((l) => console.log(l.join(""))));

let res = 0;
for (let i = 0; i < energies.length; i++) {
  for (let j = 0; j < energies[0].length; j++) {
    res += energies[i][j] === "#" ? 1 : 0;
  }
}

console.log(res);
