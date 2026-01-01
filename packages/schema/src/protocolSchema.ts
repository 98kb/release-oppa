import z from "zod";

export const protocolSchema = z.enum(["0.x"]);
export type Protocol = z.infer<typeof protocolSchema>;
