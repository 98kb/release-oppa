import z from "zod";

export const commandSchema = z.enum(["inspect"]);
export type Command = z.infer<typeof commandSchema>;
