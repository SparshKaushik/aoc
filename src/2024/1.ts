export default async function One() {
  const input = await Bun.file("./src/2024/inputs/1.txt").text();
  const list = input
    .split("\n")
    .filter(Boolean)
    .reduce<number[][]>(
      (acc, line) => {
        const [a, b] = line
          .split(" ")
          .filter((x) => x.length)
          .map(Number);
        return [acc[0].concat(a), acc[1].concat(b)];
      },
      [[], []],
    )
    .map((arr) => arr.sort());

  let sum = 0;
  for (let i = 0; i < list[0].length; i++) {
    let diff = list[0][i] - list[1][i];
    sum += diff >= 0 ? diff : -diff;
  }
  console.log("Part 1:", sum);

  let summ = 0;
  for (let i = 0; i < list[0].length; i++) {
    let num = list[0][i];
    summ += num * list[1].filter((x) => x === num).length;
  }

  console.log("Part 2:", summ);
}
