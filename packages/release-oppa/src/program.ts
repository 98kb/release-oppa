import {Command} from "commander";
import {version} from "../package.json";
import {inspect} from "./commands/inspect/inspect";

export const program = new Command()
  .name("oppa")
  .description("Automated semantic versioning and publishing")
  .version(version)
  .addCommand(inspect);
