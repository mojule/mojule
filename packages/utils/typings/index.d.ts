// Typescript type definitions for mojule-utils


/**
 *Capitalize the first letter in the passed string.
 */
export function capitalizeFirstLetter(str: string): string

/**
 *Create a clone of the passed object. Note: Uses JSON stringify/parse.
 @param [obj={}] Object to clone.
 */
export function clone(obj: Object): Object

/**
 *replace any '<' in the passed str with '&lt'
 *@param str Html string to escape.
 */
export function escapeHtml(str: string): string

/**
 *Generate an id comprising random hex values to a nominated length.
 *@param [prefix=''] Optional prefix to the generated id. (Hyphen appended to separate from unique)
 *@param [length=32] Length for generated part of the id.
 */
export function id(prefix: string, length: number): string

/**
 *Make a passed id value safe by replacing any special characters [^a-z0-9] with hyphen '-'.  Note: Starting, ending and multiple hyphens are removed.
 *@param value id value to make safe.
 *@param [caseSensitive=false] true if case of letters in id to be preserved.
 */
export function identifier(value: string, caseSensitive: boolean): string

/**
 *Returns true if every source object property exists on, and has the same value as, the test object.
 *@param [obj={}] Test object
 *@param [src={}] Source object.  Test object properties must exist on and have the same value as this objects properties
 */
export function matches(obj: Object, source: Object): boolean

/**
 * Splits passed string on hyphens and returns with hyphens removed and camel casing.
 * @param [str=''] Hyphenated string to be concatenated with camel casing.
 * @param [capitalizeFirst=false] If true then initial letter of first word is also capitalized.
 * @example 'input-radio-icon' -> 'inputRadioIcon'
 */
export function hyphenatedToCamelCase(str: string, capitalizeFirst : boolean): string

/**
 * Converts a camelCased string to a hyphenated string - inverse of hyphenatedToCamelCase
 * @param [str=''] camelCased string to be converted to a hyphenated string
 * @example 'inputRadioIcon' -> 'input-radio-icon'
 */
export function camelCaseToHyphenated(str: string): string