declare module "StylerTypes" {
    export type Style = {
        [key: string]: any;
    };
    export type Styler = (...rawStyles: Style[]) => StyleFactory;
    export type StyleFactory = (classNames?: string, errorHandler?: (error: any) => void) => StyleMap;
    export type StyleMap = (mapFn?: (classNames: string, key: string, value: any) => void) => Style;
}
declare module "utils/hasProp" {
    export function hasProp(target: object, prop: string): any;
}
declare module "utils/isObj" {
    export function isObj(val: any): boolean;
}
declare module "utils/cloneStyle" {
    /**
     * Create deep clone of given style object
     *
     * @param {Object} style
     */
    export default function cloneStyle(style: any): any;
}
declare module "utils/styleAssign" {
    /**
     * Assigns value to target object with key
     *
     * @param {Object} target
     * @param {String} key
     * @param {*} value
     */
    export function styleAssign(target: object, key: string, value: any): void;
    /**
     * Helper method clone and assigns value to target object with key
     *
     * @param {Object} target
     * @param {String} key
     * @param {*} value
     */
    export function styleAssignAndClone(target: object, key: string, value: any): void;
}
declare module "utils/merge" {
    /**
     * Creates a deeply merged copy of the specified objects
     *
     * @returns {Object}
     */
    export default function deepMerge(...args: object[]): {
        [key: string]: any;
    };
}
declare module "constants" {
    export const ID = "#";
    export const CLASSNAME = ".";
    export const COMMAND = "@";
    export const RUNTIME_COMMAND = "+";
    export const CHILD_CLASS = "&";
    export const RUNTIME_COMMAND_DESCRIPTOR = "__runtime_commands__";
    export const STYLER_BUNDLE_DESCRIPTOR = "__styler_bundle__";
}
declare module "utils/FlatStyle" {
    import type { Style } from "StylerTypes";
    export type FlatStyle = {
        styles: Style;
        commands: {
            [key: string]: any;
        };
        runtimeCommands: {
            [key: string]: any;
        };
    };
}
declare module "utils/styleDenormalizer" {
    import type { Style } from "StylerTypes";
    import type { FlatStyle } from "utils/FlatStyle";
    export default function styleDenormalizer(...styles: Style[]): FlatStyle[];
}
declare module "utils/searchAndApplyCommand" {
    export default function searchAndApplyCommand(denormalizedStyle: any, commandMap: any, commandFactory?: any[], runtimeCommands?: {}): void;
}
declare module "commandsManager" {
    function extend(styles: object, className: string, extendFrom: string, runtimeCommands: {
        [key: string]: any;
    }): object;
    function findCommnand(command: any): typeof extend;
    export type RuntimeCommand = (styles: {
        [key: string]: any;
    }, className: string, value: any) => object;
    export type CommandFactory = (command: string) => RuntimeCommand;
    export type RuntimeCommandFactory = (command: string) => (params: {
        args: string;
        className: string;
        value: any;
    }) => object;
    const _default: {
        addCommandFactory(commandFactory: CommandFactory): void;
        addRuntimeCommandFactory(commandFactory: RuntimeCommandFactory): void;
        getCommands(): (typeof findCommnand)[];
        getRuntimeCommands(): any[];
    };
    export default _default;
}
declare module "buildStyles" {
    import type { Style } from "StylerTypes";
    export default function buildStyles(...rawStyles: Style[]): Style;
}
declare module "combineStyler" {
    /**
     * Takes multiple styling functions and returns single styling function as all is combined.
     * Searches given classnames from all given stylers then output like a single Styler.
     *
     * @example
     * ...
     * const styler1 = styler(styles1);
     * const styler2 = styler(styles2);
     * const styler3 = styler(styles3);
     *
     * const mergedStyler = combineStyler(styler1, styler2, styler3);
     * const styles = combineStyler(".button.small .button.warning");
     *
     * styles(function(className, key, value){
     *  ...
     *
     * });
     *
     * @param {...function} - Styling functions
     * @returns {function} - Styling Composer
     */
    export default function combineStyler(...stylings: any[]): (classNames: string) => (fn?: Function) => any;
}
declare module "componentStyler" {
    /**
     * Component High-Order-Styler. Gets styles from styler then assigns them to given component.
     *
     * @example
     *  ...
     *
     *  var componentStyle = componentStyler(style)(className);
     *  var comps = [comp1, comp2];
     *  comps.map(componentStyle);
     * or
     *  componentStyle(component);
     *
     * ...
     *
     * @params {Function} styler - Styles object
     * @returns {Function} - Styling composer
     */
    export default function componentStyler(styler: any): (className: any) => (component: any) => void;
}
declare module "utils/findClassNames" {
    const findClassNames: (selector: any) => any;
    export default findClassNames;
}
declare module "styler" {
    import { Styler } from "StylerTypes";
    /**
     * Styling Wrapper. In order to return desired styles. Makes styles flatted then merge all by classNames then pass merged styles to callback.
     *
     * @example
     *  import styler from "@smartface/styler";
     *  const styles = {
     *      ".button"{
     *        widht: "100px",
     *        height: "30px",
     *        ".blue": {
     *          color: "blue"
     *        },
     *        ".red": {
     *          color: "red"
     *        }
     *    }
     *  }
     *
     *  const styling = styler(styles);
     *  const blueButtonStyle = {};
     *  const redButtonStyle = {};
     *
     *  styling(".button.blue")(function(className, key, value){
     *    blueButtonStyle[key] = value;
     *  });
     *  // blueButtonStyle equals to {width: "100px", height: "20px", color: "blue"}
     *
     *  styling(".button.red")(function(className, key, value){
     *    redButtonStyle[key] = value;
     *  });
     *  // redButtonStyle equals to {width: "100px", height: "20px", color: "red"}
     *
     * @param {...Object.<string, (string | number | function | Object)>} - Style Objects
     * @returns {function} - Styling composer
     */
    const styler: Styler;
    export default styler;
}
declare module "flatStyler" {
    /**
     * Flats specified Stylers
     *
     * @param {...function} - Styling functions
     * return {function} - Styling Composer
     */
    export default function flatStyler(...stylers: Function[]): (classNames?: string) => any;
}
declare module "flatStyles" {
    import builder from "buildStyles";
    export default builder;
}
declare module "index" { }
declare module "memoizeStyler" {
    /**
     * Memoize Pattern implementation for Styler. Decorates a styler function
     * and caches every request then returns styles from the cache.
     *
     * @param {function} styling - Styling function
     * @returns {function} - Styling composer
     */
    export default function memoizeStyler(styling: any): (classNames: any) => (fn?: any) => {
        [key: string]: any;
    };
}
declare module "mergeStyler" {
    const combineStyler: any;
    /**
     * Use combineStyler
     *
     * @deprecated
     */
    export default combineStyler;
}
declare module "themeStyler" {
    const _default_1: (styler: any) => (theme: any) => (className: any) => {};
    export default _default_1;
}
declare module "utils/flatMapStyles" {
    const flatMapStyles: (style: any, classNames: any, fn: any) => void;
    export default flatMapStyles;
}
declare module "utils/getClassValue" {
    export default function getClassValue(styleDef: object): (className: string) => any;
}
declare module "utils/mapStyles" {
    export default function mapStyles(style: object, classNames: string[], fn: (className: string, key: string, style: any) => any): void;
}
declare module "utils/upppercaseToDash" {
    export default function uppercaseToDash(str: any): any;
}
