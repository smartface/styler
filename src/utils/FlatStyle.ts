import type { Style } from "../StylerTypes";

export type FlatStyle = {
  styles: Style;
  commands: { [key: string]: any; };
  runtimeCommands: { [key: string]: any; };
};
