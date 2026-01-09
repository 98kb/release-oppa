import z from "zod";

export const dockerPluginOptionsSchema = z.object({
  registry: z.string(),
  imageName: z.string(),
  dockerfile: z.string().default("./Dockerfile"),
  context: z.string().default("."),
});
