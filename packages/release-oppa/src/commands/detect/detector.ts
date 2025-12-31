import type {
  ContextEnrichment,
  Plugin,
  RuntimeContext,
} from "@release-oppa/plugin";

export const detector = async <Enrichment extends ContextEnrichment>(
  plugin: Plugin<Enrichment>,
  context: RuntimeContext & {extra?: Enrichment},
) => {
  const detection = await plugin.detect(context);
  if (detection.compatible) {
    context.extra ??= {} as Enrichment;
    Object.assign(context.extra, detection.extra);
  }
  return detection;
};
