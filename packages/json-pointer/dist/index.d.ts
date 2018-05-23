/// <reference types="micromatch" />
import * as mm from 'micromatch';
export declare type CompiledPointer = string[];
export declare type Pointer = string | CompiledPointer;
export declare type PointerMapValue = string | number | boolean | null | never[] | {};
export interface PointerMap {
    [pointer: string]: PointerMapValue;
}
export interface PointerValue {
    pointer: string;
    value: PointerMapValue;
    order: number;
}
export interface DiffValue extends PointerValue {
    newValue?: PointerMapValue;
    newOrder?: number;
    delete?: boolean;
    add?: boolean;
}
export declare const get: (obj: any, pointer: string | string[]) => any;
export declare const set: (obj: any, pointer: string | string[], value: any) => any;
export declare const compile: (pointer: string | string[]) => {
    get: (obj: any) => any;
    set: (obj: any, value: any) => any;
};
export declare const flatten: (source: any) => any;
export declare const expand: (source: PointerMap, target?: any) => any;
export declare const pointers: (source: any) => string[];
export declare const glob: (source: any, patterns: string | string[], options?: mm.Options | undefined) => any[];
export declare const pointerValueArray: (pointerMap: PointerMap) => PointerValue[];
export declare const globPointerValues: (pointerValues: PointerValue[], patterns: string | string[], options?: mm.Options | undefined) => PointerValue[];
export declare const sortedPointerValues: (pointerValues: PointerValue[]) => PointerValue[];
export declare const pointerValueArrayToPointerMap: (pointerValues: PointerValue[], sort?: boolean) => PointerMap;
export declare const diff: (left: PointerValue[], right: PointerValue[], sort?: boolean) => DiffValue[];
export declare const newFromDiff: (diffs: DiffValue[]) => PointerValue[];
export declare const oldFromDiff: (diffs: DiffValue[]) => PointerValue[];
