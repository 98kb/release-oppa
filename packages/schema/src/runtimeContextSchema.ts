import z from "zod";
import {commandSchema} from "./commandSchema";
import {protocolSchema} from "./protocolSchema";

export const runtimeContextSchema = z.object({
  cwd: z.string().default(process.cwd()),
  command: commandSchema,
  protocol: protocolSchema,
});

export type RuntimeContext = z.infer<typeof runtimeContextSchema>;
