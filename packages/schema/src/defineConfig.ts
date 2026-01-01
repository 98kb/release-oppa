import {type Config} from "./configSchema";
import type {ContextEnrichment} from "./ContextEnrichment";

export const defineConfig = <
  Enrichment extends ContextEnrichment = ContextEnrichment,
>(
  config: Config<Enrichment>,
): Config<Enrichment> => config;
