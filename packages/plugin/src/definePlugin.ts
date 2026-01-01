import type {
  ContextEnrichment,
  Plugin,
  PluginOptions,
} from "@release-oppa/schema";
import {preDetect} from "./preDetect";

export function definePlugin<
  Enrichment extends ContextEnrichment = ContextEnrichment,
>(options: PluginOptions<Enrichment>): Plugin<Enrichment> {
  return {
    name: options.name,
    version: options.version,
    protocols: options.protocols,
    detect: preDetect(options),
    inspect: options.inspect,
  };
}
