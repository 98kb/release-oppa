import type {
  Command,
  ContextEnrichment,
  RuntimeContext,
} from "@release-oppa/schema";

export const createContext = ({}: {
  command: Command;
}): RuntimeContext & {extras?: ContextEnrichment} => ({
  cwd: process.cwd(),
  command: "inspect",
  protocol: "0.x",
});
