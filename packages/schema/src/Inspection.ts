import type {Json} from "./Json";

export type Inspection =
  | {
      ok: false;
      reasons?: string[];
      details?: Json;
    }
  | {
      ok: true;
      details?: Json;
    };
