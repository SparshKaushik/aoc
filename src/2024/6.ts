// (y,x)
const directions = [
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
  [-1, 0], // up
];

const guard = [">", "v", "<", "^"];

export default async function Six() {
  const input = (await Bun.file("./src/2024/inputs/6.txt").text())
    .split("\n")
    .filter(Boolean);
  let grid = input.map((x) => x.split(""));
  let currentDirection = 3;
  let currentPosition: [number, number] = getCurrentPosition(
    grid,
    currentDirection,
  );
  while (!isEnd(currentDirection, getNeighbors(grid, currentPosition))) {
    if (isStuck(currentDirection, getNeighbors(grid, currentPosition))) {
      currentDirection = (currentDirection + 1) % 4;
    }
    grid = moveGuard(grid, currentPosition, currentDirection);
    currentPosition = getCurrentPosition(grid, currentDirection);
  }
  console.log(
    "Part 1:",
    grid.reduce((acc, x) => acc + x.filter((y) => y === "X").length, 0) + 1,
  );

  const loopPositions = findLoopPositions(input);

  console.log("Part 2:", loopPositions);
}

function moveGuard(
  grid: string[][],
  currentPosition: number[],
  currentDirection: number,
) {
  const [y, x] = currentPosition;
  const [dy, dx] = directions[currentDirection];
  const newPosition = [y + dy, x + dx];
  grid[currentPosition[0]][currentPosition[1]] = "X";
  grid[newPosition[0]][newPosition[1]] = guard[currentDirection];
  return grid;
}

function isEnd(currentDirecton: number, neighbors: string[]) {
  return neighbors[currentDirecton] === undefined;
}

function isStuck(currentDirection: number, neighbors: string[]) {
  return neighbors[currentDirection] === "#";
}

function getNeighbors(grid: string[][], currentPosition: number[]) {
  const [y, x] = currentPosition;
  return directions.map(([dy, dx]) => {
    return grid[y + dy]?.[x + dx];
  });
}

function getCurrentPosition(
  grid: string[][],
  currentDirection: number,
): [number, number] {
  const col = grid.findIndex((x) => x.includes(guard[currentDirection]));
  const row = grid[col].indexOf(guard[currentDirection]);
  return [col, row];
}

function findLoopPositions(input: string[]): [number, number][] {
  const grid = input.map((x) => x.split(""));
  const loopPositions: [number, number][] = [];
  const startPosition = getCurrentPosition(
    grid,
    guard.indexOf(findGuardDirection(grid)),
  );

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      // Skip the guard's starting position and existing obstacles
      if (
        (y === startPosition[0] && x === startPosition[1]) ||
        grid[y][x] === "#"
      ) {
        continue;
      }

      // Check if adding an obstacle creates a loop
      if (simulateGuardPath(input, [y, x])) {
        loopPositions.push([y, x]);
      }
    }
  }

  return loopPositions;
}

function simulateGuardPath(
  input: string[],
  obstaclePosition?: [number, number],
): boolean {
  let grid = input.map((x) => x.split(""));

  // Add obstacle if specified
  if (obstaclePosition) {
    const [y, x] = obstaclePosition;
    grid[y][x] = "#";
  }

  let currentDirection = guard.indexOf(findGuardDirection(grid));
  let currentPosition = getCurrentPosition(grid, currentDirection);
  const visited = new Set<string>();
  let steps = 0;

  while (steps < 10000) {
    // Prevent infinite loop
    const neighbors = getNeighbors(grid, currentPosition);

    // Check if guard is stuck
    if (isStuck(currentDirection, neighbors)) {
      currentDirection = (currentDirection + 1) % 4;
    }
    // Check if guard can move
    else if (!isEnd(currentDirection, neighbors)) {
      grid = moveGuard(grid, currentPosition, currentDirection);
      currentPosition = getCurrentPosition(grid, currentDirection);
    }
    // Guard leaves the map
    else {
      return false;
    }

    steps++;

    // Check for loop
    const positionKey = `${currentPosition[0]},${currentPosition[1]},${currentDirection}`;
    if (visited.has(positionKey)) {
      return true;
    }
    visited.add(positionKey);
  }

  return false;
}

function findGuardDirection(grid: string[][]): string {
  for (const directionChar of guard) {
    for (const row of grid) {
      if (row.includes(directionChar)) {
        return directionChar;
      }
    }
  }
  throw new Error("Guard not found");
}
