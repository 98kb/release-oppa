import z from "zod";
import {type Plugin, pluginSchema} from "./pluginSchema";
import type {ContextEnrichment} from "./ContextEnrichment";

export const configSchema = z.object({
  plugins: z.array(pluginSchema).default([]),
});
export type Config<Enrichment extends ContextEnrichment> = {
  plugins: Plugin<Enrichment>[];
};
