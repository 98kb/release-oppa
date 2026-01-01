import {configPromise} from "./configPromise";
import {createProgram} from "./createProgram";

(async () => {
  const program = createProgram({config: await configPromise});
  program.parse(process.argv);
})();
