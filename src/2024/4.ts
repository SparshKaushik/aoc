export default async function Four() {
  const input = await Bun.file("./src/2024/inputs/4.txt").text();
  const list = input
    .split("\n")
    .filter(Boolean)
    .map((x) => x.split(""));

  let n = 0;

  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list[i].length; j++) {
      if (list[i][j] === "X") {
        // Check Horizontal
        j < list[i].length - 3 &&
          checkXMAS(
            list[i][j],
            list[i][j + 1],
            list[i][j + 2],
            list[i][j + 3],
          ) &&
          ++n;
        // Check Horizontal reverse
        j > 2 &&
          checkXMAS(
            list[i][j],
            list[i][j - 1],
            list[i][j - 2],
            list[i][j - 3],
          ) &&
          ++n;
        // Check Vertical
        i < list.length - 3 &&
          checkXMAS(
            list[i][j],
            list[i + 1][j],
            list[i + 2][j],
            list[i + 3][j],
          ) &&
          ++n;
        // Check Vertical reverse
        i > 2 &&
          checkXMAS(
            list[i][j],
            list[i - 1][j],
            list[i - 2][j],
            list[i - 3][j],
          ) &&
          ++n;
        // Check Diagonal
        i < list.length - 3 &&
          j < list[i].length - 3 &&
          checkXMAS(
            list[i][j],
            list[i + 1][j + 1],
            list[i + 2][j + 2],
            list[i + 3][j + 3],
          ) &&
          ++n;
        // Check Diagonal reverse
        i > 2 &&
          j > 2 &&
          checkXMAS(
            list[i][j],
            list[i - 1][j - 1],
            list[i - 2][j - 2],
            list[i - 3][j - 3],
          ) &&
          ++n;
        // Check Anti-Diagonal
        i < list.length - 3 &&
          j > 2 &&
          checkXMAS(
            list[i][j],
            list[i + 1][j - 1],
            list[i + 2][j - 2],
            list[i + 3][j - 3],
          ) &&
          ++n;
        // Check Anti-Diagonal reverse
        i > 2 &&
          j < list[i].length - 3 &&
          checkXMAS(
            list[i][j],
            list[i - 1][j + 1],
            list[i - 2][j + 2],
            list[i - 3][j + 3],
          ) &&
          ++n;
      }
    }
  }

  console.log("Part 1:", n);

  let n2 = 0;
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list[i].length; j++) {
      if (list[i][j] === "A") {
        if (list[i - 1] && list[i + 1]) {
          const top = list[i - 1][j - 1] + list[i - 1][j + 1];
          const bot = list[i + 1][j - 1] + list[i + 1][j + 1];

          if (
            (top === "MS" && bot === "MS") ||
            (top === "SM" && bot === "SM") ||
            (top === "SS" && bot === "MM") ||
            (top === "MM" && bot === "SS")
          ) {
            n2++;
          }
        }
      }
    }
  }

  console.log("Part 2:", n2);
}

function checkXMAS(...arr: string[]) {
  return Number(arr.join("") === "XMAS" || arr.join("") === "SAMX");
}
