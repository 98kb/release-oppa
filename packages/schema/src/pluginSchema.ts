import z from "zod";
import {type Protocol, protocolSchema} from "./protocolSchema";
import type {ContextEnrichment} from "./ContextEnrichment";
import {type RuntimeContext} from "./runtimeContextSchema";
import {type Detection} from "./Detection";
import {type Inspection} from "./Inspection";

export const pluginSchema = z.object({
  name: z.string(),
  version: z.string(),
  protocols: z.array(protocolSchema),
  detect: z.function(),
  inspect: z.function(),
});

export interface Plugin<Enrichment extends ContextEnrichment> {
  name: string;
  version: string;
  protocols: Protocol[];
  detect: (
    context: RuntimeContext,
  ) =>
    | Promise<Detection & {extra?: Enrichment}>
    | (Detection & {extra?: Enrichment});
  inspect?: (
    context: RuntimeContext & {extra?: Enrichment},
  ) => Promise<Inspection> | Inspection;
}
