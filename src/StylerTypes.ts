import { Style } from "./Style";


export type Styler = (...rawStyles: Style[]) => StyleFactory;
export type StyleFactory = (classNames?: string, errorHandler?: (error: any) => void) => StyleMap;
export type StyleMap = (mapFn?: (classNames: string, key: string, value: any) => void) => Style;
