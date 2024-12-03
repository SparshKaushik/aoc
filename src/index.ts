import { program } from "commander";
import Days2024 from "./2024";
import { intro, isCancel, outro, select } from "@clack/prompts";
import { cancelHandler } from "./utils";

const codes = {
  "2024": Days2024,
};

async function run(year: string, day: number) {
  if (!Object.keys(codes).includes(year)) {
    throw new Error(`Year ${year} not found`);
  }
  const dayModule = codes[year as keyof typeof codes][day];
  if (!dayModule) {
    throw new Error(`Day ${day} not found for year ${year}`);
  }
  await dayModule();
}

async function main() {
  program.option("-y, --year <year>", "Year of the challenge");
  program.option("-d, --day <day>", "Day of the challenge (1-25)");

  program.parse();

  const options = program.opts();

  intro("Advent of Code By @SparshKaushik");

  const yearSelect =
    options.year ||
    (await select({
      message: "Select Year",
      options: Object.keys(codes).map((year) => ({
        value: year,
        label: year,
      })),
    }));
  cancelHandler(isCancel(yearSelect));
  const year = yearSelect.toString();

  const daySelect =
    options.day ||
    (await select({
      message: "Select Day",
      options: codes[year as keyof typeof codes].map((_, i) => ({
        value: i,
        label: (i + 1).toString(),
      })),
    }));
  cancelHandler(isCancel(daySelect));

  const day = Number(daySelect);

  outro("Running Day " + day + " of " + year.toString());

  await run(year.toString(), day - 1);
}

main();
