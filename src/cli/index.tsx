import { render } from "ink";
import { Command } from "commander";
import Home from "./components/home";
import chalk from "chalk";
import { unlinkSync } from "node:fs";

const program = new Command();

program
  .name("tslings")
  .description("Learn Typescript by fixing tests.")
  .on("--help", () => {
    console.log("");
    console.log("Examples:");
    console.log("");
    console.log("  $ tslings watch");
    console.log("  $ tslings clear");
  });

program
  .command("watch")
  .alias("w")
  .description("tslings interactive code testing UI")
  .action(() => {
    render(<Home />);
  });

program.exitOverride();

program
  .command("clear")
  .alias("c")
  .description("Clears all your user data to start fresh")
  .action(() => {
    const path = "./.user_progress.json";
    try {
      unlinkSync(path);
    } catch (error) {
      console.log(chalk.green("Reset successful"));
      return;
    }

    console.log(chalk.green("Reset successful"));
  });

program.parse(process.argv);
