import {definePlugin} from "@release-oppa/plugin";
import pkg from "../package.json";
import type {DockerPluginOptions} from "./DockerPluginOptions";
import {createDetect} from "./detect/createDetect";
import {createInspect} from "./inspect/createInspect";
import {dockerPluginOptionsSchema} from "./dockerPluginOptionsSchema";

export const plugin = (opts: DockerPluginOptions) => {
  const options = dockerPluginOptionsSchema.parse(opts);
  return definePlugin({
    name: "Docker",
    version: pkg.version,
    protocols: ["0.x"],
    detect: createDetect(options),
    inspect: createInspect(options),
  });
};
