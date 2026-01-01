import type {
  Config,
  ContextEnrichment,
  Inspection,
  RuntimeContext,
} from "@release-oppa/schema";
import {printYaml} from "../../lib/printYaml";
import {detector} from "../detect/detector";

export const inspector = async <Enrichment extends ContextEnrichment>(
  config: Config<Enrichment>,
  context: RuntimeContext & {extra?: Enrichment},
  // eslint-disable-next-line complexity
) => {
  const inspectionDetails: Record<string, unknown> = {};
  for await (const plugin of config.plugins) {
    const detection = await detector(plugin, context);
    if (detection.compatible && plugin.inspect) {
      const inspection = await plugin.inspect(context);
      inspectionDetails[plugin.name] = toInspectionDetails(inspection);
    }
  }
  printYaml(inspectionDetails);
};

function toInspectionDetails(inspection: Inspection): unknown {
  if (inspection.ok) {
    return inspection.details;
  } else {
    return toErrorDetails(inspection.reasons);
  }
}

function toErrorDetails(Reasons?: string[]): {Error: {Reasons: string[]}} {
  return {
    Error: {
      Reasons: Reasons ?? ["Inspection failed"],
    },
  };
}
