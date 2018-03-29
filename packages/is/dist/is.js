"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isEmptyObject = (obj) => {
    for (const key in obj)
        return false;
    return true;
};
const isNumber = (subject) => typeof subject === 'number' && isFinite(subject);
const isInteger = (subject) => Number.isInteger(subject);
const isString = (subject) => typeof subject === 'string';
const isBoolean = (subject) => typeof subject === 'boolean';
const isArray = (subject) => Array.isArray(subject);
const isNull = (subject) => subject === null;
const isUndefined = (subject) => subject === undefined;
const isFunction = (subject) => typeof subject === 'function';
// I think you can exclude array, null etc with Diff<T, U> in TS 2.8, look into
const isObject = (subject) => typeof subject === 'object' && !isNull(subject) && !isArray(subject);
const isEmpty = (subject) => isObject(subject) && isEmptyObject(subject);
exports.is = {
    number: isNumber,
    integer: isInteger,
    string: isString,
    boolean: isBoolean,
    array: isArray,
    null: isNull,
    undefined: isUndefined,
    function: isFunction,
    object: isObject,
    empty: isEmpty
};
//# sourceMappingURL=is.js.map