import type {Detection, PluginOptions} from "@release-oppa/schema";
import type {DockerPluginOptions} from "../DockerPluginOptions";
import {execSync} from "child_process";
import {existsSync} from "fs";

export function createDetect(
  opts: DockerPluginOptions,
): PluginOptions["detect"] {
  // eslint-disable-next-line max-statements, complexity
  return async ({}) => {
    const detection: Detection = {
      compatible: true,
      reasons: [],
      supportedCommands: ["inspect"],
    };

    if (!isDockerAvailable()) {
      detection.compatible = false;
      detection.reasons?.push("Docker CLI is not available in the system.");
    }

    if (!isDockerFilePresent(opts)) {
      detection.compatible = false;
      detection.reasons?.push(
        `Dockerfile not found at path: ${opts.dockerfile}`,
      );
    }

    return detection;
  };
}

function isDockerAvailable(): boolean {
  try {
    execSync("docker --version", {stdio: "ignore"});
    return true;
  } catch {
    return false;
  }
}

function isDockerFilePresent({dockerfile}: DockerPluginOptions): boolean {
  try {
    existsSync(dockerfile);
    return true;
  } catch {
    return false;
  }
}
