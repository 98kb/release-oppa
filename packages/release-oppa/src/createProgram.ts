import {Command} from "commander";
import {version} from "../package.json";
import {inspect} from "./commands/inspect/inspect";
import type {Config, ContextEnrichment} from "@release-oppa/schema";

export const createProgram = <Enrichment extends ContextEnrichment>({
  config,
}: {
  config: Config<Enrichment>;
}) =>
  new Command()
    .name("oppa")
    .description("Automated semantic versioning and publishing")
    .version(version)
    .addCommand(inspect({config}));
