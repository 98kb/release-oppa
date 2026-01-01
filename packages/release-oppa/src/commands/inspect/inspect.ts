import {Command} from "commander";
import {inspector} from "./inspector";
import type {Config, ContextEnrichment} from "@release-oppa/schema";
import {createContext} from "../../createContext";

export const inspect = <Enrichment extends ContextEnrichment>({
  config,
}: {
  config: Config<Enrichment>;
}) =>
  new Command().name("inspect").action(async () => {
    const context = createContext({command: "inspect"});
    await inspector(config, context);
  });
