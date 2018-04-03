import { Predicates } from './types';
declare const Is: {
    is: {
        number: (subject: any) => subject is number;
        integer: (subject: any) => subject is number;
        string: (subject: any) => subject is string;
        boolean: (subject: any) => subject is boolean;
        array: (subject: any) => subject is any[];
        null: (subject: any) => subject is null;
        undefined: (subject: any) => subject is undefined;
        function: (subject: any) => subject is (...args: any[]) => any;
        object: (subject: any) => subject is any;
        empty: (subject: any) => subject is {};
    };
    extendDefaults: (predicates: Predicates) => Predicates;
    utils: {
        isType: (subject: any, typename: string) => boolean;
        isOnly: (subject: any, typename: string) => boolean;
        some: (subject: any, ...typenames: string[]) => boolean;
        every: (subject: any, ...typenames: string[]) => boolean;
        of: (subject: any) => string | undefined;
        allOf: (subject: any) => string[];
        types: () => string[];
    };
    Utils: (predicates: Predicates) => {
        isType: (subject: any, typename: string) => boolean;
        isOnly: (subject: any, typename: string) => boolean;
        some: (subject: any, ...typenames: string[]) => boolean;
        every: (subject: any, ...typenames: string[]) => boolean;
        of: (subject: any) => string | undefined;
        allOf: (subject: any) => string[];
        types: () => string[];
    };
};
export = Is;
