import type {ContextEnrichment} from "./ContextEnrichment";
import type {Plugin} from "./pluginSchema";
import type {Protocol} from "./protocolSchema";

export type PluginOptions<
  Enrichment extends ContextEnrichment = ContextEnrichment,
> = {
  name: string;
  version: string;
  protocols: Protocol[];
  detect?: Plugin<Enrichment>["detect"];
  inspect?: Plugin<Enrichment>["inspect"];
};
