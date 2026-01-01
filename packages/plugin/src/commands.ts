import type {Command} from "@release-oppa/schema";

const commandsRecord: Record<Command, boolean> = {
  inspect: true,
};
export const commands = Object.keys(commandsRecord) as Command[];
