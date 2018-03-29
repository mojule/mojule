"use strict";
const is_1 = require("./is");
/*
  We add the custom predicates twice - first time, so that their key order is
  retained, then we add the defaults, then we add the custom predicates again
  in case any of them are supposed to override a default predicate
*/
const extendDefaults = (predicates) => Object.assign({}, predicates, is_1.is, predicates);
const Utils = (predicates) => {
    const keys = Object.keys(predicates);
    const isType = (subject, typename) => predicates[typename] && predicates[typename](subject);
    const isOnly = (subject, typename) => isType(subject, typename) && allOf(subject).length === 1;
    const some = (subject, ...typenames) => typenames.some(typename => isType(subject, typename));
    const every = (subject, ...typenames) => typenames.every(typename => isType(subject, typename));
    const _of = (subject) => keys.find(key => isType(subject, key));
    const allOf = (subject) => keys.filter(key => isType(subject, key));
    const types = () => keys.slice();
    return { isType, isOnly, some, every, of: _of, allOf, types };
};
const utils = Utils(is_1.is);
const Is = { is: is_1.is, extendDefaults, utils, Utils };
module.exports = Is;
//# sourceMappingURL=index.js.map