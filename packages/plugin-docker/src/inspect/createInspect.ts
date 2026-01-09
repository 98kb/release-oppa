import type {PluginOptions, Inspection} from "@release-oppa/schema";
import type {DockerPluginOptions} from "../DockerPluginOptions";
import {getTags} from "@snyk/docker-registry-v2-client";
import path from "path";
import {existsSync} from "fs";

export function createInspect(
  opts: DockerPluginOptions,
): PluginOptions["inspect"] {
  return async ({}) => {
    try {
      const allTags = await getTags(
        opts.registry,
        opts.imageName,
        undefined,
        undefined,
        1,
        1,
      );

      const inspection: Inspection = {
        ok: true,
        details: {
          Local: {
            Context: toAbsContextPath(opts),
            Dockerfile: toAbsDockerfilePath(opts),
          },
          Remote: {
            Registry: opts.registry,
            Repository: opts.imageName,
            Latest: allTags,
          },
        },
      };
      return inspection;
    } catch (error) {
      const inspection: Inspection = {
        ok: false,
        details: opts,
        reasons: ["Failed to fetch tags from Docker registry.", `${error}`],
      };
      return inspection;
    }
  };
}

function toAbsContextPath(opts: DockerPluginOptions): string {
  return path.resolve(opts.context);
}

function toAbsDockerfilePath(opts: DockerPluginOptions): string {
  const dockerfile = path.resolve(opts.dockerfile);
  if (existsSync(dockerfile)) {
    return dockerfile;
  }
  return `${dockerfile} (does not exist)`;
}
