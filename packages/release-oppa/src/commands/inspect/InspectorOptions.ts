import type {ContextEnrichment, Plugin} from "@release-oppa/plugin";

export type InspectorOptions<Enrichment extends ContextEnrichment> = {
  plugins: Plugin<Enrichment>[];
};
