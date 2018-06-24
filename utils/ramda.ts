import { reduce, mergeWith, forEachObjIndexed, mapObjIndexed, transduce, pair, keys, head, pick, take } from "ramda";
import { stubObj } from "ramda-adjunct";

export function mergeAllWith(fn: (x, y) => any, items: object[]) {
    return reduce((acc: object, item: object) => mergeWith(fn, acc, item), stubObj(), items);
}
