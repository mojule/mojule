'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var StringTree = require('@mojule/string-tree');

var parse = function parse(str) {
  str = str.replace(patterns.comments, '\n');

  var stringTree = StringTree.deserialize(str, { retainEmpty: true });

  return stringNodeToNode(null, stringTree);
};

var patterns = {
  comments: /(\/\*[^*]*\*+([^/*][^*]*\*+)*\/)|(?:\/\/.*\n)/g,
  tag: /^\s*\S+>\s*$/,
  scalar: /^\s*(\S+):\s+(.*)$/,
  inlineArray: /^\s*(\S+)\[]\s+(.+)$/,
  objectProperty: /^\s*(\S+){}\s*$/,
  arrayProperty: /^\s*(\S+)\[]\s*$/,
  embedProperty: /^\s*(\S+)\$\s*$/,
  arrayLiteral: /^\s*\[]\s*$/,
  objectLiteral: /^\s*{}\s*$/,
  inlineArrayLiteral: /^\s*\[]\s+(.+)$/,
  quotedString: /"([^"\\\\]*|\\\\["\\\\bfnrt\/]|\\\\u[0-9a-f]{4})*"/,
  quotedStringSplitter: /("(?:[^"\\\\]*|\\\\["\\\\bfnrt\/]|\\\\u[0-9a-f]{4})*")/
};

var createNode = function createNode(name) {
  return [{ name: name, model: {} }];
};

var isTag = function isTag(str) {
  return patterns.tag.test(str);
};
var isScalar = function isScalar(str) {
  return patterns.scalar.test(str);
};
var isInlineArray = function isInlineArray(str) {
  return patterns.inlineArray.test(str);
};
var isObjectProperty = function isObjectProperty(str) {
  return patterns.objectProperty.test(str);
};
var isArrayProperty = function isArrayProperty(str) {
  return patterns.arrayProperty.test(str);
};
var isEmbedProperty = function isEmbedProperty(str) {
  return patterns.embedProperty.test(str);
};
var isArrayLiteral = function isArrayLiteral(str) {
  return patterns.arrayLiteral.test(str);
};
var isObjectLiteral = function isObjectLiteral(str) {
  return patterns.objectLiteral.test(str);
};
var isInlineArrayLiteral = function isInlineArrayLiteral(str) {
  return patterns.inlineArrayLiteral.test(str);
};

var parseValue = function parseValue(value) {
  try {
    value = JSON.parse(value);
  } catch (e) {}

  return value;
};

var getScalar = function getScalar(str) {
  var matches = patterns.scalar.exec(str);
  var name = matches[1];
  var value = parseValue(matches[2]);

  return { name: name, value: value };
};

var toArray = function toArray(str) {
  var segs = str.split(patterns.quotedStringSplitter);

  var tokens = segs.reduce(function (t, seg) {
    if (patterns.quotedString.test(seg)) {
      t.push(seg);

      return t;
    }

    seg = seg.trim();

    if (seg !== '') {
      var subsegs = seg.split(/\s+/);

      t.push.apply(t, _toConsumableArray(subsegs));
    }

    return t;
  }, []);

  return tokens.map(parseValue);
};

var getInlineArray = function getInlineArray(str) {
  var matches = patterns.inlineArray.exec(str);
  var name = matches[1];
  var value = toArray(matches[2]);

  return { name: name, value: value };
};

var getObjectProperty = function getObjectProperty(stringNode) {
  var str = stringNode.getValue();
  var matches = patterns.objectProperty.exec(str);
  var name = matches[1];
  var value = {};

  stringNode.getChildren().forEach(function (stringChild) {
    addToObject(value, stringChild);
  });

  return { name: name, value: value };
};

var getArrayProperty = function getArrayProperty(stringNode) {
  var str = stringNode.getValue();
  var matches = patterns.arrayProperty.exec(str);
  var name = matches[1];
  var value = [];

  stringNode.getChildren().forEach(function (stringChild) {
    addToArray(value, stringChild);
  });

  return { name: name, value: value };
};

var getEmbedProperty = function getEmbedProperty(stringNode) {
  var leading = stringNode.getMeta('indent') + 2;
  var str = stringNode.getValue();
  var matches = patterns.embedProperty.exec(str);
  var name = matches[1];
  var value = '';

  stringNode.walk(function (current, parent, depth) {
    if (current === stringNode) return;

    var indent = current.getMeta('indent');
    var indentation = ' '.repeat(indent - leading);
    var str = current.getValue();

    value += '' + indentation + str + '\n';
  });

  return { name: name, value: value };
};

var addToArray = function addToArray(arr, stringNode) {
  var str = stringNode.getValue();

  if (isArrayLiteral(str)) {
    var arrLiteral = [];

    stringNode.getChildren().forEach(function (stringChild) {
      addToArray(arrLiteral, stringChild);
    });

    arr.push(arrLiteral);
  } else if (isObjectLiteral(str)) {
    var objLiteral = {};

    stringNode.getChildren().forEach(function (stringChild) {
      addToObject(objLiteral, stringChild);
    });

    arr.push(objLiteral);
  } else if (isInlineArrayLiteral(str)) {
    var matches = patterns.inlineArrayLiteral.exec(str);
    var items = matches[1];

    arr.push(toArray(items));
  } else {
    arr.push.apply(arr, _toConsumableArray(toArray(str)));
  }
};

var addToObject = function addToObject(obj, stringNode) {
  var str = stringNode.getValue();

  var nameValue = void 0;

  if (isScalar(str)) {
    nameValue = getScalar(str);
  } else if (isInlineArray(str)) {
    nameValue = getInlineArray(str);
  } else if (isObjectProperty(str)) {
    nameValue = getObjectProperty(stringNode);
  } else if (isArrayProperty(str)) {
    nameValue = getArrayProperty(stringNode);
  } else if (isEmbedProperty(str)) {
    nameValue = getEmbedProperty(stringNode);
  } else if (str.trim() === '') {
    return;
  } else {
    throw new Error('Unexpected line in cdoc: ' + str);
  }

  var _nameValue = nameValue,
      name = _nameValue.name,
      value = _nameValue.value;


  obj[name] = value;
};

var stringNodeToNode = function stringNodeToNode(parent, stringNode) {
  var value = stringNode.getValue();

  if (isTag(value)) {
    value = value.replace(/>/g, '');

    var node = createNode(value);

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

module.exports = parse;