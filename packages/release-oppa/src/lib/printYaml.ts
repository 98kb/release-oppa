import YAML from "yaml";
import {highlight} from "cli-highlight";

export function printYaml(data: unknown): void {
  const report = YAML.stringify(data);
  console.log(highlight(report, {language: "yaml", ignoreIllegals: true}));
}
