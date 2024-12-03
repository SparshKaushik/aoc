export default async function Three() {
  const input = await Bun.file("./src/2024/inputs/3.txt").text();

  const ops = input
    .matchAll(/mul\(\d+\,\d+\)/g)
    .toArray()
    .map((x) => x[0]);

  let sum = 0;
  for (const op of ops) {
    const [a, b] = op
      .replace("mul(", "")
      .replace(")", "")
      .split(",")
      .map(Number);
    sum += a * b;
  }
  console.log("Part 1:", sum);

  const ddops = input
    .matchAll(/don\'t\(\)|do\(\)|mul\(\d+\,\d+\)/g)
    .toArray()
    .map((x) => x[0]);

  let sumdd = 0;
  let doenabled = true;

  for (const op of ddops) {
    if (op === "don't()") {
      doenabled = false;
    } else if (op === "do()") {
      doenabled = true;
    } else if (doenabled) {
      const [a, b] = op
        .replace("mul(", "")
        .replace(")", "")
        .split(",")
        .map(Number);
      sumdd += a * b;
    }
  }

  console.log("Part 2:", sumdd);
}
