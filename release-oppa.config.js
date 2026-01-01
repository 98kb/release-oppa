import {defineConfig} from "release-oppa";
import {git} from "release-oppa/plugins";

export default defineConfig({
  plugins: [git],
});
