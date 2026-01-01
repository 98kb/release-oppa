import {existsSync} from "fs";
import path from "path";
import {travelUp} from "@release-oppa/fs-utils";

export function findConfig(cwd: string): string | null {
  const candidates = [
    "release-oppa.config.js",
    "release-oppa.config.ts",
    "release-oppa.config.mjs",
  ];
  let fullConfigPath = null;
  travelUp(dir => {
    for (const candidate of candidates) {
      const candidatePath = path.join(dir, candidate);
      if (existsSync(candidatePath)) {
        fullConfigPath = candidatePath;
      }
    }
    return false;
  }, cwd);
  return fullConfigPath;
}
