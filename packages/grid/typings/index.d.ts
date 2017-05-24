// Typescript type definitions for @mojule/grid

export interface gridStatic {

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
  getColumnFrom(rows: Array<Array<any>>, x: number = 0, startY: number = 0, endY: number): Array<any>;

  /** Returns a subset of the elements in the selected columns of the rows array.
    * @param {Array<Array<any>>} rows An array of row arrays.
    * @param {number} [startX=0] Starting column index.
    * @param {number} [endX=maxColumns] Ending column index.
    * @param {number} [startY=0] Starting row index.
    * @param {number} [endY=maxRows] Ending row index.
    * @returns {Array<Array<any>>} The selected columns rows values.
    */
  getColumnsFrom(rows: Array<Array<any>>, startX: number = 0, endX: number = 0, startY: number = 0, endY: number): Array<any>;

  /** Returns a subset of the elements in the selected column of the rows array.
    * @param {Array<Array<any>>} rows An array of row arrays.
    * @param {number} [y=0] A row index.
    * @param {number} [startX=0] Starting column index.
    * @param {number} [endX=maxCols] Ending column index.
    * @returns {Array<any>} The selected rows column values.
    */
  getRowFrom(rows: Array<Array<any>>, y: number = 0, startX: number = 0, endX: number): Array<any>;

  /** Returns a subset of the elements in the selected columns of the rows array.
    * @param {Array<Array<any>>} rows An array of row arrays.
    * @param {number} [startY=0] Starting row index.
    * @param {number} [endY=maxRows] Ending row index.
    * @param {number} [startX=0] Starting column index.
    * @param {number} [endX=maxCols] Ending column index.
    * @returns {Array<any>} The selected rows columns values.
    */
  getRowsFrom(rows: Array<Array<any>>, startY: number = 0, endY: number, startX: number = 0, endX: number): Array<any>;

  createState(): any;

}

export var Grid: gridStatic;

