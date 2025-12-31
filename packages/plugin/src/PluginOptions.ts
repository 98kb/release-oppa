import type {ContextEnrichment} from "./ContextEnrichment";
import type {Plugin} from "./Plugin";
import type {Protocol} from "./Protocol";

export type PluginOptions<Enrichment extends ContextEnrichment> = {
  name: string;
  version: string;
  protocols: Protocol[];
  detect?: Plugin<Enrichment>["detect"];
  inspect?: Plugin<Enrichment>["inspect"];
};
