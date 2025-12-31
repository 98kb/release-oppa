import type {ContextEnrichment} from "./ContextEnrichment";
import type {Detection} from "./Detection";
import type {Inspection} from "./Inspection";
import type {Protocol} from "./Protocol";
import type {RuntimeContext} from "./RuntimeContext";

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
