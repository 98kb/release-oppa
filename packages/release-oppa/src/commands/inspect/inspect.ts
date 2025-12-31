import {Command} from "commander";
import * as git from "@release-oppa/plugin-git";
import {inspector} from "./inspector";
import type {RuntimeContext} from "@release-oppa/plugin";

export const inspect = new Command().name("inspect").action(async () => {
  const context: RuntimeContext = {
    cwd: process.cwd(),
    command: "inspect",
    protocol: "0.x",
  };
  await inspector({plugins: [git.plugin]}, context);
});
