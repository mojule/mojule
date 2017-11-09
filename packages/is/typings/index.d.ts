// Typescript definitions for @mojule/is.
// Note: An export = declaration, which substitutes a different entity to be exported
// in place of the module itself, is always emitted as an assignment to module.exports.
// It is an error to have other exports in a module that uses export =.
// For information regarding issues with module formats refer to:
// https://github.com/Microsoft/TypeScript/issues/2242#issuecomment-83694181

interface IIndexedPredicates {
    [name: string]: TSubjectTest;
}
interface IDefaultPredicates {
    number: TSubjectTest;
    integer: TSubjectTest;
    string: TSubjectTest;
    boolean: TSubjectTest;
    array: TSubjectTest;
    null: TSubjectTest;
    undefined: TSubjectTest;
    function: TSubjectTest;
    object: TSubjectTest;
    empty: TSubjectTest;
}

declare type TIsGenericFunc = (subject?: any, ...args: any[]) => boolean | string | string[] | undefined;
declare type TSubjectTest = (subject: any) => boolean;
declare type TSubjectTypeTest = (subject: any, typename: string) => boolean;
declare type TSubjectTypesTest = (subject: any, ...typenames: string[]) => boolean;
declare type TSubjectOfTest = (subject: any) => string | undefined;
declare type TSubjectAllOfTest = (subject: any) => string[];
declare type TNames = () => string[];
interface IIsHelperFuncs {
    is: TSubjectTypeTest;
    isOnly: TSubjectTypeTest;
    some: TSubjectTypesTest;
    every: TSubjectTypesTest;
    of: TSubjectOfTest;
    allOf: TSubjectAllOfTest;
    types: TNames;
}
interface IIsIndexedFuncs extends IDefaultPredicates, IIsHelperFuncs {
    [name: string]: TIsGenericFunc;
}
interface IIsFactory {
    (predicates?: IIndexedPredicates): IIsIndexedFuncs;
}
interface IIs extends IIsFactory, IIsIndexedFuncs {
}
declare const Is: IIs;
export = Is;
