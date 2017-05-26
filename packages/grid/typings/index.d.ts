// Typescript type definitions for @mojule/grid


declare module grid {
  /** Options to describe and extend rows data  */
  export interface rowsOptions {
    /** true if the rows data includes column headers */
    hasColumnHeaders: boolean;
    /** true if the rows data includes row headers */
    hasRowHeaders: boolean;
    /** array of column header names */
    columnNames: Array<string>;
    /** array of row header names */
    rowNames: Array<string>;
    /** format of rows data i.e. csv   */
    format: string;
  }

/** Returned by fromFormat */
  export interface formatted {
    rows: Array<Array<any>>,
    options : rowsOptions
  }

  /** Returned by createState */
  export interface state {
    /** rows data */
    rows: Array<Array<any>>;
    /** column names if options.hasColumnHeaders true or rows data */
    columnNames: Array<string>;
    rowNames: Array<string>;
  }

  /** Static functions
   *
   */
  export interface static {

    /** Converts a column index to the corresponding string.
      * @param {number} index An integer column index. i.e. 0,1,2...
      * @returns {string} The string equivalent. i.e 0->'A', 25->'Z', 26->'AA'
      */
    columnIndexToName(index: number): string;


    /** Converts a column name to the corresponding integer.
      * @param {string} name A column index name. i.e. 'A','B',...'AA', 'AB'...
      * @returns {number} The integer equivalent. i.e 'A'->0 'Z'->25, 'AA'->26
      */
    columnNameToIndex(name: string): number;


    /** Returns the length of the row array with the most elements.
      * @param {Array<Array<any>>} rows An array of row arrays.
      * @returns {number} The length of the row array with the most elements.
      */
    getWidth(rows: Array<Array<any>>): number;

    /** Returns the number of rows.
      * @param {Array<Array<any>>} rows An array of row arrays.
      * @returns {number} The length of the rows array.
      */
    getHeight(rows: Array<Array<any>>): number;


    /** Returns true if rows is an array of arrays.
      * @param {Array<Array<any>>} rows An array of row arrays.
      * @returns {boolean} True if rows is an array of arrays.
      */
    isRows(rows: Array<Array<any>>): boolean;


    /** Returns a subset of the elements in the selected column of the rows array.
      * @param {Array<Array<any>>} rows An array of row arrays.
      * @param {number} [x=0] A column index.
      * @param {number} [startY=0] Starting row index.
      * @param {number} [endY=maxRows] Ending row index.
      * @returns {Array<any>} The selected column rows values.
      */
    getColumnFrom(rows: Array<Array<any>>, x: number, startY: number, endY: number): Array<any>;

    /** Returns a subset of the elements in the selected columns of the rows array.
      * @param {Array<Array<any>>} rows An array of row arrays.
      * @param {number} [startX=0] Starting column index.
      * @param {number} [endX=maxColumns] Ending column index.
      * @param {number} [startY=0] Starting row index.
      * @param {number} [endY=maxRows] Ending row index.
      * @returns {Array<Array<any>>} The selected columns rows values.
      */
    getColumnsFrom(rows: Array<Array<any>>, startX: number, endX: number, startY: number, endY: number): Array<any>;

    /** Returns a subset of the elements in the selected column of the rows array.
      * @param {Array<Array<any>>} rows An array of row arrays.
      * @param {number} [y=0] A row index.
      * @param {number} [startX=0] Starting column index.
      * @param {number} [endX=maxCols] Ending column index.
      * @returns {Array<any>} The selected rows column values.
      */
    getRowFrom(rows: Array<Array<any>>, y: number, startX: number, endX: number): Array<any>;

    /** Returns a subset of the elements in the selected columns of the rows array.
      * @param {Array<Array<any>>} rows An array of row arrays.
      * @param {number} [startY=0] Starting row index.
      * @param {number} [endY=maxRows] Ending row index.
      * @param {number} [startX=0] Starting column index.
      * @param {number} [endX=maxCols] Ending column index.
      * @returns {Array<any>} The selected rows columns values.
      */
    getRowsFrom(rows: Array<Array<any>>, startY: number, endY: number, startX: number, endX: number): Array<any>;

    /** Converts 'rows' into state using passed 'options'
     * @param {any} rows Some sort of rows data in a supported format.
     * @param {rowsOptions} options Options describing and extending rows.
     * @returns {state} Passed row data as a Grid state.
     */
    createState(rows: any, options: rowsOptions): state;

    /** Returns array of supported format names.
     * @returns {Array<string>} Array of supported format names i.e. [ 'models', 'columnsModel', 'csv' ]
     */
    formatNames(): Array<string>;

    /** Returns true if the passed 'value' contains data in the named format
     * @param {string} formatName Checks 'value' is data in this format i.e. csv
     * @param {any} value Checked to see if matches format.
     * @returns {boolean} True of the contents of 'value' are in named format.
     */
    isFormat(formatName: string, value: any): boolean;

    /** Returns the name of the format of the passed data in 'value'.
     * @param {any} value Data to analyse for a format.
     * @returns {string} Name of format of data in 'value' if any. Returns 'undefined' if data not in known format
     */
    formatFor(value: any): string


    /** Returns the processed 'value' data for loading into Grid instance.
     * @param {string} name The name of the format of 'value'. If no 'value' passed this is 'value'.
     * @param {any} value Data to analyse for a format.
     * @param {rowsOptions} options Data to analyse for a format.
     * @returns {formatted} Processed 'value' as rows and options.
     */
    fromFormat(name: string, value?: any, options?: rowsOptions): formatted;

  }
}

export declare var Grid: grid.static;


