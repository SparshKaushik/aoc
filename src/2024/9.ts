export default async function Nine() {
  const input = (await Bun.file("./src/2024/inputs/9.txt").text())
    .split("")
    .map(Number);

  let disk: string[] = [];

  let id = 0;

  input.forEach((size, i) => {
    if (i % 2 === 0) {
      disk.push(...Array(size).fill(id.toString()));
      id++;
    } else {
      disk.push(...Array(size).fill("."));
    }
  });

  const disk1 = [...disk];

  for (let i = disk1.length - 1; i >= 0; i--) {
    if (disk1[i] == "." || disk1.indexOf(".") > i) continue;
    disk1[disk1.indexOf(".")] = disk1[i];
    disk1[i] = ".";
  }

  const checksum = disk1.reduce(
    (acc, curr, i) => acc + (curr !== "." ? i * Number(curr) : 0),
    0,
  );

  console.log("Part 1:", checksum);

  const diskMap = input.map((size, i) => ({ id: i % 2 ? "." : i / 2, size }));
  const files = [...diskMap];

  for (let j = files.length - 1; j >= 0; j--) {
    if (files[j].id === ".") continue;
    let file = files[j];

    for (let i = 0; i < j; i++) {
      let free = files[i];
      if (free.id === "." && free.size >= file.size) {
        free.size -= file.size;
        files[j] = { id: ".", size: file.size };
        files.splice(i, 0, file);
        break;
      }
    }
  }

  const blocks = files.flatMap(({ id, size }) => new Array(size).fill(id));
  const checksum2 = blocks.reduce(
    (acc, x, i) => acc + (x === "." ? 0 : i * Number(x)),
    0,
  );
  console.log("Part 2:", checksum2);
}
