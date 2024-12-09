export default async function Eight() {
  const input = (await Bun.file("./src/2024/inputs/8.txt").text())
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split(""));

  const rows = input.length;
  const cols = input[0].length;

  const antennas: Record<string, number[][]> = {};

  input.forEach((line, y) => {
    line.forEach((char, x) => {
      if (char !== ".") {
        if (antennas[char] === undefined) {
          antennas[char] = [];
        }
        antennas[char].push([x, y]);
      }
    });
  });

  let antinodes: [number, number][] = [];

  Object.values(antennas).forEach((arr) => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (i === j) continue;

        const [x1, y1] = arr[i];
        const [x2, y2] = arr[j];

        antinodes.push([2 * x1 - x2, 2 * y1 - y2]);
      }
    }
  });

  const n = new Set(
    [...antinodes]
      .filter(([x, y]) => x >= 0 && x < cols && y >= 0 && y < rows)
      .map(([x, y]) => `${x}-${y}`),
  ).size;
  console.log("Part 1:", n);

  antinodes = [];
  Object.values(antennas).forEach((arr) => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (i === j) continue;
        const [x1, y1] = arr[i];
        const [x2, y2] = arr[j];
        const dx = x2 - x1;
        const dy = y2 - y1;
        let x = x1;
        let y = y1;
        while (0 <= y && y < rows && 0 <= x && x < cols) {
          antinodes.push([x, y]);
          x += dx;
          y += dy;
        }
      }
    }
  });
  const n2 = new Set(
    [...antinodes]
      .filter(([x, y]) => x >= 0 && x < cols && y >= 0 && y < rows)
      .map(([x, y]) => `${x}-${y}`),
  ).size;
  console.log("Part 2:", n2);
}
