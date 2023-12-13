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

const DIRECTIONS = {
  UP: [0, -1],
  DOWN: [0, 1],
  LEFT: [-1, 0],
  RIGHT: [1, 0],
};

const directions = {
  ["-"]: [DIRECTIONS.LEFT, DIRECTIONS.RIGHT],
  ["|"]: [DIRECTIONS.UP, DIRECTIONS.DOWN],
  ["L"]: [DIRECTIONS.UP, DIRECTIONS.RIGHT],
  ["J"]: [DIRECTIONS.UP, DIRECTIONS.LEFT],
  ["7"]: [DIRECTIONS.DOWN, DIRECTIONS.LEFT],
  ["F"]: [DIRECTIONS.RIGHT, DIRECTIONS.DOWN],
  ["S"]: [DIRECTIONS.UP, DIRECTIONS.DOWN, DIRECTIONS.LEFT, DIRECTIONS.RIGHT],
  ["."]: [],
};

let map = [];
for (let i = 0; i < input.length; i++) {
  const tiles = input[i].split("");
  map.push(tiles);
}

let visited = [];
let sPos;

for (let i = 0; i < map.length; i++) {
  visited.push([]);
  for (let j = 0; j < map[i].length; j++) {
    visited[i].push(-1);
    if (map[i][j] === "S") {
      sPos = [j, i];
    }
  }
}

const opp = (direction) => {
  return [-direction[0], -direction[1]];
};

const same = (pos1, pos2) => {
  return pos1[0] === pos2[0] && pos1[1] === pos2[1];
};

// assume targetDir is valid
const connected = (sourcePipe, targetDir, destPipe) => {
  const destPipeDirs = directions[destPipe];
  for (const dir of directions[destPipe]) {
    if (same(dir, opp(targetDir))) {
      return true;
    }
  }
  return false;
};

const neighbors = (pos) => {
  const currPipe = map[pos[1]][pos[0]];
  const routes = directions[currPipe];
  const result = [];
  for (const route of routes) {
    const [x1, y1] = [pos[0] + route[0], pos[1] + route[1]];
    if (x1 >= 0 && y1 >= 0 && y1 < map.length && x1 < map[0].length) {
      const nextPipe = map[y1][x1];
      if (connected(currPipe, route, nextPipe)) {
        result.push([x1, y1]);
      }
    }
  }
  return result;
};

const part1 = () => {
  const queue = [{ pos: sPos, count: 0 }];
  const result = [];
  let max = 0;

  while (queue.length) {
    const v = queue.shift();
    const x = v.pos[0];
    const y = v.pos[1];

    if (visited[y][x] === -1) {
      //   visited[y][x] = v.count;
      visited[y][x] = 0;
      max = Math.max(max, v.count);
      result.push(v.pos);

      const currNeighbors = neighbors([x, y]);
      for (const n of currNeighbors) {
        queue.push({ pos: n, count: v.count + 1 });
      }
    }
  }

  return max;
};

let res = 0;
const part2 = () => {
  for (let y = 0; y < visited.length; y++) {
    let enclosed = false;
    for (let x = 0; x < visited[y].length; x++) {
      const pipe = map[y][x];
      // part of the loop
      if (visited[y][x] === 0) {
        if (["|", "F", "7", "S"].includes(pipe)) {
          enclosed = !enclosed;
        }
      } else {
        if (enclosed) {
          visited[y][x] = "*";
          res++;
        }
      }
    }
  }
  return res;
};

console.log("Part 1: ", part1());
console.log("Part 2: ", part2());
// console.log(visited);
// console.log(map);
