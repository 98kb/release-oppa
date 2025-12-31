import type {Command} from "./Command";

const commandsRecord: Record<Command, boolean> = {
  inspect: true,
};
export const commands = Object.keys(commandsRecord) as Command[];
