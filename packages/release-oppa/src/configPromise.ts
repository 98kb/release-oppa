import {loadConfig} from "@release-oppa/config-loader";

export const configPromise = loadConfig(process.cwd());
