import type {Command} from "./Command";

export type Detection = {
  compatible: boolean;
  reasons?: string[];
  supportedCommands: Command[];
};
