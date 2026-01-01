import "tsx/esm";
import {pathToFileURL} from "url";
import {findConfig} from "./findConfig";
import {
  configSchema,
  type ContextEnrichment,
  type Config,
} from "@release-oppa/schema";

export async function loadConfig<Enrichment extends ContextEnrichment>(
  cwd: string,
): Promise<Config<Enrichment>> {
  const configFilePath = findConfig(cwd);
  if (configFilePath) {
    const fileUrl = pathToFileURL(configFilePath).href;
    const configModule = await import(fileUrl);
    return configSchema.parse(
      configModule.default ?? configModule,
    ) as Config<Enrichment>;
  }
  return configSchema.parse({
    plugins: [],
  }) as Config<Enrichment>;
}
