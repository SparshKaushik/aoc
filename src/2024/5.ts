export default async function Five() {
  const input = await Bun.file("./src/2024/inputs/5.txt").text();
  const cleanInput = input.split("\n").filter(Boolean);
  const rules = cleanInput
    .filter((x) => x.includes("|"))
    .map((x) => x.split("|"));
  const updates = cleanInput
    .filter((x) => x.includes(","))
    .map((x) => x.split(","));

  let unordered: string[][] = [];

  let sum = updates.reduce((acc, cur) => {
    const appliedRules = rules.filter(
      (x) => cur.includes(x[0]) && cur.includes(x[1]),
    );
    let valid = true;
    appliedRules.forEach((x) => {
      if (cur.indexOf(x[0]) > cur.indexOf(x[1]) && valid) {
        unordered.push(cur);
        valid = false;
      }
    });
    return valid ? acc + Number(cur[Math.round(cur.length / 2) - 1]) : acc;
  }, 0);

  console.log("Part 1:", sum);

  let ordered = unordered.reduce(
    (acc, cur) =>
      acc +
      Number(
        cur.sort((a, b) =>
          rules.some((x) => x[0] === a && x[1] === b) ? -1 : 1,
        )[Math.round(cur.length / 2) - 1],
      ),
    0,
  );

  console.log("Part 2:", ordered);
}
