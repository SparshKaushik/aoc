export default async function Two() {
  const input = await Bun.file("./src/2024/inputs/2.txt").text();
  const list = input
    .split("\n")
    .filter(Boolean)
    .map((x) => x.split(" ").map(Number));

  let n = 0;
  let n2 = 0;

  for (const i of list) {
    let k = false;

    for (let j = 0; j < i.length; j++) {
      const rmd = [...i.slice(0, j), ...i.slice(j + 1)];

      if (isSafe(rmd)) {
        k = true;
        break;
      }
    }
    if (isSafe(i)) {
      n++;
    }
    if (isSafe(i) || k) n2++;
  }
  console.log("Part 1:", n);
  console.log("Part 2:", n2);
}

function isSafe(arr: number[]) {
  const diffs: number[] = [];

  for (let i = 1; i < arr.length; i++) {
    diffs.push(arr[i] - arr[i - 1]);
  }

  const inc = diffs.every((d) => d >= 1 && d <= 3);
  const dec = diffs.every((d) => d <= -1 && d >= -3);

  return inc || dec;
}
