import type {Command} from "./commandSchema";

export type Detection = {
  compatible: boolean;
  reasons?: string[];
  supportedCommands: Command[];
};
