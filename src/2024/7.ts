const operations: ((a: number, b: number) => number)[] = [
  (a: number, b: number) => a + b,
  (a: number, b: number) => a * b,
  (a: number, b: number) => +(String(a) + b),
];

export default async function Seven() {
  const input = (await Bun.file("./src/2024/inputs/7.txt").text())
    .split("\n")
    .filter(Boolean);
  const equations = input.map((line) => line.split(/ |: /).map(Number));

  let currentOperations = operations.slice(0, 2);

  function tryOperation(eq: number[], i: number, tot: number): boolean {
    if (i >= eq.length) return tot === eq[0];
    return currentOperations.some((op) =>
      tryOperation(eq, i + 1, op(tot, eq[i])),
    );
  }

  const result = equations.reduce(
    (sum, eq) => (sum += tryOperation(eq, 2, eq[1]) ? eq[0] : 0),
    0,
  );

  console.log("Part 1:", result);

  currentOperations = operations;
  const result2 = equations.reduce(
    (sum, eq) => (sum += tryOperation(eq, 2, eq[1]) ? eq[0] : 0),
    0,
  );

  console.log("Part 2:", result2);
}
