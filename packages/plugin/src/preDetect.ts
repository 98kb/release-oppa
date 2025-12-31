import {commands} from "./commands";
import type {ContextEnrichment} from "./ContextEnrichment";
import type {Plugin} from "./Plugin";
import type {PluginOptions} from "./PluginOptions";

export const preDetect = <Enrichment extends ContextEnrichment>(
  options: PluginOptions<Enrichment>,
): Plugin<Enrichment>["detect"] => {
  return context => {
    const isSupported = options.protocols.includes(context.protocol);
    if (isSupported) {
      if (options.detect instanceof Function) {
        return options.detect(context);
      }
      return {
        compatible: false,
        reasons: [`Command "${context.command}" is not supported.`],
        supportedCommands: commands.filter(cmd => cmd in options),
      };
    }
    return {
      compatible: false,
      reasons: [
        `Protocol "${context.protocol}" is not supported by this plugin.`,
      ],
      supportedCommands: [],
    };
  };
};
