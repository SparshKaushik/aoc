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
  program.option("--cli", "Boolean Value if you want to run CI Mode");
  program.option("-y, --year <year>", "Year of the challenge");
  program.option("-d, --day <day>", "Day of the challenge (1-25)");

  program.parse();

  const options = program.opts();

  if (options.cli) {
    await run(options.year, Number(options.day) - 1);
    return;
  }

  intro("Advent of Code By @SparshKaushik");

  const yearSelect = await select({
    message: "Select Year",
    options: Object.keys(codes).map((year) => ({
      value: year,
      label: year,
    })),
  });
  cancelHandler(isCancel(yearSelect));
  const year = yearSelect.toString();

  const daySelect = await select({
    message: "Select Day",
    options: codes[year as keyof typeof codes].map((_, i) => ({
      value: i,
      label: (i + 1).toString(),
    })),
  });
  cancelHandler(isCancel(daySelect));

  const day = Number(daySelect);

  outro("Running Day " + (day + 1) + " of " + year.toString());

  await run(year.toString(), day);
}

main();
