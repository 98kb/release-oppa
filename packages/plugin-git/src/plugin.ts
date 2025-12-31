import {definePlugin} from "@release-oppa/plugin";
import pkg from "../package.json";
import {travelUp} from "@release-oppa/fs-utils";
import {existsSync} from "fs";
import {GitInspector} from "./GitInspector";

export const plugin = definePlugin({
  name: "Git",
  version: pkg.version,
  protocols: ["0.x"],
  detect(context) {
    const gitRoot = travelUp(dir => {
      return existsSync(`${dir}/.git`);
    }, context.cwd);

    return {
      compatible: gitRoot !== null,
      reason: gitRoot === null ? "Not inside a Git repository" : undefined,
      supportedCommands: ["inspect"],
      extra: {
        workdir: gitRoot ?? undefined,
      },
    };
  },
  async inspect(context) {
    if (context.extra?.workdir) {
      const inspector = new GitInspector({
        baseDir: context.extra.workdir,
      });
      return {
        ok: true,
        details: await inspector.toDetails(),
      };
    } else {
      return {
        ok: false,
        reasons: ["No Git repository found"],
      };
    }
  },
});
