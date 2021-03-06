"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = require("@mojule/is");
const assert = require("assert");
const __1 = require("..");
const Obj = () => ({
    a: 1,
    b: {
        c: 2
    },
    d: {
        e: [{ a: 3 }, { b: 4 }, { c: 5 }]
    }
});
const DiffLeft = () => ({
    unchanged: [[], {}],
    changed: 0,
    unchangedArray: [1, 2, 3],
    changedArray: [4, 5, 6],
    moved: 7,
    movedAndChanged: 8,
    removed: 9
});
const DiffRight = () => ({
    unchanged: [[], {}],
    changed: 9,
    unchangedArray: [1, 2, 3],
    changedArray: [6, 4, 5],
    movedAndChanged: 11,
    moved: 7,
    added: 8
});
const Arr = () => ['a', 'b', 'c'];
const validateError = re => err => (err instanceof Error) && re.test(err.message);
const pointerError = validateError(/^Invalid JSON pointer/);
const inputError = validateError(/^Invalid input/);
const jsonError = validateError(/^Expected JSON compatible value/);
describe('pointer', () => {
    describe('get', () => {
        it('gets from object', () => {
            const obj = Obj();
            assert.equal(__1.get(obj, '/a'), 1);
            assert.equal(__1.get(obj, '/b/c'), 2);
            assert.equal(__1.get(obj, '/d/e/0/a'), 3);
            assert.equal(__1.get(obj, '/d/e/1/b'), 4);
            assert.equal(__1.get(obj, '/d/e/2/c'), 5);
        });
        it('gets from array', () => {
            const arr = Arr();
            assert.equal(__1.get(arr, '/0'), 'a');
            assert.equal(__1.get(arr, '/1'), 'b');
            assert.equal(__1.get(arr, '/2'), 'c');
            assert.equal(__1.get(arr, '/3'), undefined);
            assert.equal(__1.get(arr, '/-'), undefined);
        });
        it('gets root value', () => {
            const obj = Obj();
            assert.equal(__1.get(obj, ''), obj);
        });
        it('returns "undefined" when path extends beyond any existing objects', () => {
            const obj = Obj();
            assert.strictEqual(__1.get(obj, '/x/y/z'), undefined);
        });
        it('throws on bad paths', () => {
            const obj = Obj();
            assert.throws(() => __1.get(obj, 'a'), pointerError);
            assert.throws(() => __1.get(obj, 'a/'), pointerError);
        });
        it('throws on bad input value', () => {
            assert.throws(() => __1.get('bad', '/0'), inputError);
        });
    });
    describe('set', () => {
        it('set returns old values', () => {
            const obj = Obj();
            assert.equal(__1.set(obj, '/a', 2), 1);
            assert.equal(__1.set(obj, '/b/c', 3), 2);
            assert.equal(__1.set(obj, '/d/e/0/a', 4), 3);
            assert.equal(__1.set(obj, '/d/e/1/b', 5), 4);
            assert.equal(__1.set(obj, '/d/e/2/c', 6), 5);
            assert.equal(__1.get(obj, '/a'), 2);
            assert.equal(__1.get(obj, '/b/c'), 3);
            assert.equal(__1.get(obj, '/d/e/0/a'), 4);
            assert.equal(__1.get(obj, '/d/e/1/b'), 5);
            assert.equal(__1.get(obj, '/d/e/2/c'), 6);
        });
        it('sets nested values', () => {
            const obj = Obj();
            assert.equal(__1.set(obj, '/f/g/h/i', 6), undefined);
            assert.equal(__1.get(obj, '/f/g/h/i'), 6);
        });
        it('sets an array', () => {
            const obj = Obj();
            assert.equal(__1.set(obj, '/f/g/h/foo/-', 'test'), undefined);
            const arrValue = __1.get(obj, '/f/g/h/foo');
            assert(Array.isArray(arrValue));
            assert.equal(arrValue[0], 'test');
        });
        it('sets "null" as a value', () => {
            const obj = Obj();
            __1.set(obj, '/f/g/h/foo/-', 'test');
            assert.equal(__1.set(obj, '/f/g/h/foo/0', null), 'test');
            assert.strictEqual(__1.get(obj, '/f/g/h/foo/0'), null);
            assert.equal(__1.set(obj, '/b/c', null), 2);
            assert.strictEqual(__1.get(obj, '/b/c'), null);
        });
        it('can unset values with "undefined"', () => {
            const obj = Obj();
            __1.set(obj, '/a', undefined);
            assert.strictEqual(__1.get(obj, '/a'), undefined);
            __1.set(obj, '/d/e/1', undefined);
            assert.strictEqual(__1.get(obj, '/d/e/1'), undefined);
        });
        it('throws on bad input value', () => {
            assert.throws(() => __1.set('bad', '/0', 'B'), inputError);
        });
        it('throws on bad compiled pointer', () => {
            assert.throws(() => __1.set([], [], 'Bad'), pointerError);
        });
    });
    describe('compile', () => {
        it('compiles pointer', () => {
            const a = { foo: 'bar' };
            const ptr = __1.compile('/foo');
            assert.equal(ptr.get(a), 'bar');
            assert.equal(ptr.set(a, 'test'), 'bar');
            assert.equal(ptr.get(a), 'test');
            assert.deepEqual(a, { foo: 'test' });
        });
        it('throws on bad pointer', () => {
            assert.throws(() => __1.compile({}), pointerError);
        });
    });
    describe('flatten', () => {
        it('flattens object', () => {
            const obj = Obj();
            const expect = {
                "/a": 1,
                "/b/c": 2,
                "/d/e/0/a": 3,
                "/d/e/1/b": 4,
                "/d/e/2/c": 5
            };
            const flattened = __1.flatten(obj);
            assert.deepEqual(flattened, expect);
        });
        it('flattens array', () => {
            const arr = Arr();
            const expect = {
                "/0": "a",
                "/1": "b",
                "/2": "c"
            };
            const flattened = __1.flatten(arr);
            assert.deepEqual(flattened, expect);
        });
        it('only flattens when flattenable', () => {
            const str = 'a';
            const result = __1.flatten(str);
            assert.strictEqual(str, result);
        });
        it('throws on bad JSON input', () => {
            const a = {};
            const b = { a };
            a.b = b;
            assert.throws(() => __1.flatten(a), jsonError);
        });
    });
    describe('expand', () => {
        it('expands object', () => {
            const expect = Obj();
            const flattened = __1.flatten(expect);
            const result = __1.expand(flattened);
            assert.deepEqual(result, expect);
        });
        it('expands array', () => {
            const expect = Arr();
            const flattened = __1.flatten(expect);
            const result = __1.expand(flattened);
            assert(is_1.is.array(result));
            assert.deepEqual(result, expect);
        });
        it('returns target when no source keys', () => {
            const expect = [1, 2, 3];
            const result = __1.expand({}, expect);
            assert.strictEqual(result, expect);
        });
        it('returns empty object when no source keys', () => {
            const expect = {};
            const result = __1.expand({});
            assert.deepEqual(result, expect);
        });
        it('expands to existing object', () => {
            const existing = { a: 1 };
            const flattened = { '/b': 2 };
            const expect = { a: 1, b: 2 };
            const result = __1.expand(flattened, existing);
            assert.deepEqual(result, expect);
        });
        it('expands to existing array', () => {
            const existing = [1];
            const flattened = { '/1': 2 };
            const expect = [1, 2];
            const result = __1.expand(flattened, existing);
            assert(is_1.is.array(result));
            assert.deepEqual(result, expect);
        });
        it('throws on bad source', () => {
            assert.throws(() => __1.expand('abc'), inputError);
        });
    });
    describe('pointers', () => {
        it('gets pointers for an object', () => {
            const obj = {
                a: 1,
                b: [2, 3, 4]
            };
            const expect = ['', '/a', '/b', '/b/0', '/b/1', '/b/2'];
            const p = __1.pointers(obj);
            assert.deepEqual(p, expect);
        });
        it('gets pointers for an array', () => {
            const arr = [
                { a: 1 },
                { b: 2 }
            ];
            const expect = ['', '/0', '/0/a', '/1', '/1/b'];
            const p = __1.pointers(arr);
            assert.deepEqual(p, expect);
        });
        it('not an object or array', () => {
            assert.deepEqual(__1.pointers('foo'), []);
        });
        it('throws on bad JSON', () => {
            const a = { foo: 'bar' };
            const b = { baz: 'qux' };
            a.b = b;
            b.a = a;
            assert.throws(() => __1.pointers(a));
        });
    });
    describe('glob', () => {
        it('globs root properties', () => {
            const obj = {
                a: 1,
                b: [2, 3, 4]
            };
            const properties = __1.glob(obj, '/*');
            const expect = [1, [2, 3, 4]];
            assert.deepEqual(properties, expect);
        });
        it('globs array range', () => {
            const obj = {
                a: 1,
                b: [2, 3, 4]
            };
            const properties = __1.glob(obj, '/b/[1-2]');
            const expect = [3, 4];
            assert.deepEqual(properties, expect);
        });
    });
    describe('pointerValueArray', () => {
        it('pointerValueArray from pointer map', () => {
            const pointerMap = __1.flatten(Obj());
            const pva = __1.pointerValueArray(pointerMap);
            const expect = [
                {
                    pointer: '/a',
                    value: 1,
                    order: 0
                },
                {
                    pointer: '/b/c',
                    value: 2,
                    order: 1
                },
                {
                    pointer: '/d/e/0/a',
                    value: 3,
                    order: 2
                },
                {
                    pointer: '/d/e/1/b',
                    value: 4,
                    order: 3
                },
                {
                    pointer: '/d/e/2/c',
                    value: 5,
                    order: 4
                }
            ];
            assert.deepEqual(pva, expect);
        });
        it('pointerValueArrayToPointerMap sorted', () => {
            const obj = Obj();
            const pointerMapIn = __1.flatten(obj);
            const pva = __1.pointerValueArray(pointerMapIn);
            // change array order to test sorting
            pva.reverse();
            const pointerMap = __1.pointerValueArrayToPointerMap(pva);
            const expanded = __1.expand(pointerMap);
            assert.equal(JSON.stringify(obj), JSON.stringify(expanded));
        });
        it('pointerValueArrayToPointerMap unsorted', () => {
            const obj = Obj();
            const pointerMapIn = __1.flatten(obj);
            const pva = __1.pointerValueArray(pointerMapIn);
            // change array order to test sorting
            pva.reverse();
            const pointerMap = __1.pointerValueArrayToPointerMap(pva, false);
            const expanded = __1.expand(pointerMap);
            // even unsorted, should still be the same aside from key order
            assert.deepEqual(obj, expanded);
            // not sorted, should be different order
            assert.notEqual(JSON.stringify(obj), JSON.stringify(expanded));
        });
        describe('diff', () => {
            const leftObj = DiffLeft();
            const rightObj = DiffRight();
            const left = __1.pointerValueArray(__1.flatten(leftObj));
            const right = __1.pointerValueArray(__1.flatten(rightObj));
            const diffs = __1.diff(left, right);
            const expect = [
                { pointer: '/unchanged/0', value: [], order: 0 },
                { pointer: '/unchanged/1', value: {}, order: 1 },
                { pointer: '/changed', value: 0, order: 2, newValue: 9 },
                { pointer: '/unchangedArray/0', value: 1, order: 3 },
                { pointer: '/unchangedArray/1', value: 2, order: 4 },
                { pointer: '/unchangedArray/2', value: 3, order: 5 },
                { pointer: '/changedArray/0', value: 4, order: 6, newValue: 6 },
                { pointer: '/changedArray/1', value: 5, order: 7, newValue: 4 },
                { pointer: '/changedArray/2', value: 6, order: 8, newValue: 5 },
                { pointer: '/moved', value: 7, order: 9, newOrder: 10 },
                { pointer: '/movedAndChanged', value: 8, order: 10, newValue: 11, newOrder: 9 },
                { pointer: '/removed', value: 9, order: 11, delete: true },
                { pointer: '/added', value: 8, order: 11, add: true }
            ];
            it('diffs', () => {
                assert.deepEqual(diffs, expect);
            });
            it('gets new from diff', () => {
                const newRight = __1.newFromDiff(diffs);
                const newRightObj = __1.expand(__1.pointerValueArrayToPointerMap(newRight));
                assert.equal(JSON.stringify(newRightObj), JSON.stringify(rightObj));
            });
            it('gets old from diff', () => {
                const newLeft = __1.oldFromDiff(diffs);
                const newLeftObj = __1.expand(__1.pointerValueArrayToPointerMap(newLeft));
                assert.equal(JSON.stringify(newLeftObj), JSON.stringify(leftObj));
            });
            it('throws on unsorted left values', () => {
                const unsortedLeft = left.slice().reverse();
                assert.throws(() => __1.diff(unsortedLeft, right));
            });
            it('throws on unsorted right values', () => {
                const unsortedRight = right.slice().reverse();
                assert.throws(() => __1.diff(left, unsortedRight));
            });
            it('diff sorts values', () => {
                const unsortedLeft = left.slice().reverse();
                const unsortedRight = right.slice().reverse();
                const diffs = __1.diff(unsortedLeft, unsortedRight, true);
                assert.deepEqual(diffs, expect);
            });
        });
        describe('globPointerValues', () => {
            it('globs pointer values', () => {
                const left = DiffLeft();
                const pointerMapLeft = __1.flatten(left);
                const pva = __1.pointerValueArray(pointerMapLeft);
                const globbedPva = __1.globPointerValues(pva, '/un*/**');
                const globbedPointerMap = __1.pointerValueArrayToPointerMap(globbedPva);
                const result = __1.expand(globbedPointerMap);
                const expect = {
                    unchanged: [[], {}],
                    unchangedArray: [1, 2, 3]
                };
                assert.deepEqual(result, expect);
            });
        });
    });
    describe('complex keys', () => {
        const complexKeys = {
            'a/b': {
                c: 1
            },
            d: {
                'e/f': 2
            },
            '~1': 3,
            '01': 4
        };
        it('unescapes correctly', () => {
            assert.equal(__1.get(complexKeys, '/a~1b/c'), 1);
            assert.equal(__1.get(complexKeys, '/d/e~1f'), 2);
            assert.equal(__1.get(complexKeys, '/~01'), 3);
            assert.equal(__1.get(complexKeys, '/01'), 4);
            assert.equal(__1.get(complexKeys, '/a/b/c'), null);
            assert.equal(__1.get(complexKeys, '/~1'), null);
        });
    });
    describe('special array rules', () => {
        it('follows draft-ietf-appsawg-json-pointer-08', () => {
            const ary = ['zero', 'one', 'two'];
            assert.equal(__1.get(ary, '/01'), null);
            assert.equal(__1.set(ary, '/-', 'three'), null);
            assert.equal(ary[3], 'three');
        });
    });
    describe('draft examples', () => {
        const example = {
            'foo': ['bar', 'baz'],
            '': 0,
            'a/b': 1,
            'c%d': 2,
            'e^f': 3,
            'g|h': 4,
            'i\\j': 5,
            'k\'l': 6,
            ' ': 7,
            'm~n': 8
        };
        it('matches expected results from draft', () => {
            assert.equal(__1.get(example, ''), example);
            const ans = __1.get(example, '/foo');
            assert.equal(ans.length, 2);
            assert.equal(ans[0], 'bar');
            assert.equal(ans[1], 'baz');
            assert.equal(__1.get(example, '/foo/0'), 'bar');
            assert.equal(__1.get(example, '/'), 0);
            assert.equal(__1.get(example, '/a~1b'), 1);
            assert.equal(__1.get(example, '/c%d'), 2);
            assert.equal(__1.get(example, '/e^f'), 3);
            assert.equal(__1.get(example, '/g|h'), 4);
            assert.equal(__1.get(example, '/i\\j'), 5);
            assert.equal(__1.get(example, '/k\'l'), 6);
            assert.equal(__1.get(example, '/ '), 7);
            assert.equal(__1.get(example, '/m~0n'), 8);
        });
    });
});
//# sourceMappingURL=index.js.map