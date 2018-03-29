export declare const is: {
    number: (subject: any) => subject is number;
    integer: (subject: any) => subject is number;
    string: (subject: any) => subject is string;
    boolean: (subject: any) => subject is boolean;
    array: (subject: any) => subject is any[];
    null: (subject: any) => subject is null;
    undefined: (subject: any) => subject is undefined;
    function: (subject: any) => subject is (...args: any[]) => any;
    object: (subject: any) => subject is object;
    empty: (subject: any) => subject is {};
};
