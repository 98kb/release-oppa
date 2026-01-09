import type z from "zod";
import {type dockerPluginOptionsSchema} from "./dockerPluginOptionsSchema";

export type DockerPluginOptions = z.infer<typeof dockerPluginOptionsSchema>;
