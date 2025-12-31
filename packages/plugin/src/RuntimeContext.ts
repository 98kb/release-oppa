import type {Command} from "./Command";
import type {Protocol} from "./Protocol";

export interface RuntimeContext {
  cwd: string;
  command: Command;
  protocol: Protocol;
}
