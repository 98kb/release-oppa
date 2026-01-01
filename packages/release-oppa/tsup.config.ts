import {createTsupConfig} from "../../tsup.config";

export default createTsupConfig({
  entry: ["src/index.ts", "src/bin.ts", "src/plugins.ts"],
  banner: {js: "#!/usr/bin/env node"},
});
