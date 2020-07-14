import { Style } from "../Style";

export type FlatStyle = {
  styles: Style;
  commands: { [key: string]: any; };
  runtimeCommands: { [key: string]: any; };
};
