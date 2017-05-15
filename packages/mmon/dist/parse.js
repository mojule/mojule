'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var StringTree = require('@mojule/string-tree');

var parse = function parse(str) {
  str = str.replace(comments, '\n');

  var stringTree = StringTree.deserialize(str, { retainEmpty: true });

  return stringNodeToNode(null, stringTree);
};

var stringNodeToNode = function stringNodeToNode(parent, stringNode) {
  var raw = stringNode.getValue();
  var syntaxNode = tokenize(raw);

  if (syntaxNode.operator === '>') {
    var node = createNode(syntaxNode.identifier);

    if (parent) parent.push(node);

    stringNode.getChildren().forEach(function (stringChild) {
      stringNodeToNode(node, stringChild);
    });

    return node;
  }

  if (!parent) {
    var placeholder = [];

    addToArray(placeholder, stringNode);

    return placeholder[0];
  }

  addToObject(parent[0].model, stringNode);
};

var createNode = function createNode(name) {
  return [{ name: name, model: {} }];
};

var addToArray = function addToArray(arr, stringNode) {
  var raw = stringNode.getValue();

  if (raw.trim() === '') return;

  var syntaxNode = tokenize(raw);

  if (syntaxNode.operator === '[]') {
    var nested = [].concat(_toConsumableArray(syntaxNode.value));

    stringNode.getChildren().forEach(function (stringChild) {
      addToArray(nested, stringChild);
    });

    arr.push(nested);
  } else if (syntaxNode.operator === '{}') {
    var obj = {};

    stringNode.getChildren().forEach(function (stringChild) {
      addToObject(obj, stringChild);
    });

    arr.push(obj);
  } else if (syntaxNode.operator === '$') {
    arr.push(getMultiline(stringNode));
  } else {
    arr.push.apply(arr, _toConsumableArray(arrayValues(syntaxNode.value)));
  }
};

var addToObject = function addToObject(obj, stringNode) {
  var raw = stringNode.getValue();

  if (raw.trim() === '') return;

  var syntaxNode = tokenize(raw);
  var operator = syntaxNode.operator;


  var value = void 0;

  if (operator === '$') {
    value = getMultiline(stringNode);
  } else if (operator === '{}') {
    value = {};

    stringNode.getChildren().forEach(function (stringChild) {
      addToObject(value, stringChild);
    });
  } else if (operator === '[]') {
    value = [].concat(_toConsumableArray(syntaxNode.value));

    stringNode.getChildren().forEach(function (stringChild) {
      addToArray(value, stringChild);
    });
  } else if (operator === ':') {
    value = syntaxNode.value;
  } else {
    throw new Error('Unexpected object child: ' + raw);
  }

  obj[syntaxNode.identifier] = value;
};

var getMultiline = function getMultiline(stringNode) {
  var leading = stringNode.getMeta('indent') + 2;

  var value = '';

  stringNode.walk(function (current, parent, depth) {
    if (current === stringNode) return;

    var indent = current.getMeta('indent');
    var indentation = ' '.repeat(indent - leading);
    var str = current.getValue();

    value += '' + indentation + str + '\n';
  });

  return value;
};

var quotedString = /("(?:(?:(?=\\)\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4}))|[^"\\\0-\x1F\x7F]+)*")/;
var assignment = /(>|:|\[]|{}|\$)/;
var whitespace = /(\s+)/;
var literal = /.+/;
var comments = /(\/\*[^*]*\*+([^/*][^*]*\*+)*\/)|(?:\/\/.*\n)/g;

var or = function or() {
  for (var _len = arguments.length, regexen = Array(_len), _key = 0; _key < _len; _key++) {
    regexen[_key] = arguments[_key];
  }

  return regexen.reduce(function (result, regex, i) {
    if (i !== 0) result += '|';
    result += regex.source;
    return result;
  }, '');
};

var line = function line(regex) {
  return new RegExp('^' + regex.source + '$');
};

var tokens = new RegExp('(?:' + or(quotedString, assignment, whitespace) + ')');

var patterns = {
  quotedString: quotedString, assignment: assignment, whitespace: whitespace, literal: literal
};

var toString = function toString(values) {
  return values.reduce(function (str, current) {
    if (current.type === 'quotedString') {
      str += JSON.parse(current.value);
    } else {
      str += current.value;
    }

    return str;
  }, '');
};

var trimValues = function trimValues(values) {
  var first = -1;
  var last = values.length;

  values.forEach(function (value, i) {
    if (value.type !== 'whitespace') {
      if (first === -1) {
        first = i;
      }
      last = i;
    }
  });

  if (first === -1) return [];

  return values.slice(first, last + 1);
};

var parseValue = function parseValue(value) {
  try {
    value = JSON.parse(value);
  } catch (e) {}

  return value;
};

var arrayValues = function arrayValues(arr) {
  return arr.reduce(function (newValue, current) {
    if (current.type === 'whitespace') return newValue;

    newValue.push(parseValue(current.value));

    return newValue;
  }, []);
};

var parameterlessOperators = ['>', '$', '{}'];

var tokenize = function tokenize(str) {
  var start = -1;
  var assignment = -1;
  var i = 0;

  var segs = str.split(tokens).reduce(function (tokenized, seg) {
    if (!seg) return tokenized;

    var type = Object.keys(patterns).find(function (key) {
      return line(patterns[key]).test(seg);
    });

    if (type === 'assignment' && assignment === -1) assignment = i;

    if (type !== 'whitespace' && start === -1) start = i;

    var value = seg;

    tokenized.push({ type: type, value: value });

    i++;

    return tokenized;
  }, []);

  var type = assignment === -1 ? 'data' : 'assignment';

  var node = { type: type };

  if (type === 'assignment') {
    var value = segs.slice(assignment + 1);

    node.operator = segs[assignment].value;
    node.identifier = toString(segs.slice(start, assignment));

    if (node.operator === ':') {
      value = trimValues(value);

      if (value.length === 1) {
        node.value = parseValue(value[0].value);
      } else {
        node.value = toString(value);
      }
    } else if (node.operator === '[]') {
      node.value = arrayValues(value);
    } else if (!parameterlessOperators.includes(node.operator)) {
      node.value = value;
    }
  } else {
    node.value = segs;
  }

  return node;
};

module.exports = parse;