import { and, any, curry, equals, evolve, mapObjIndexed, values, where, keys, pick } from 'ramda';
import { isNilOrEmpty, omitBy } from 'ramda-adjunct';
import { IPredicateMap } from './IPredicateMap';
import { PredicateDescriptor } from './predicate-descriptor';
import { mergeAllWith } from './utils';

type Token = string | number | Symbol;
export const shouldIgnore = (...tokens: Token[]) => {
  return function(item: any) {
    return isNilOrEmpty(item) || any(equals(item), tokens);
  }
}

function transform(source: object) {
  return mapObjIndexed((val: any) => {
    return (p: PredicateDescriptor<any>) => ({
        [ p.key ]: curry(p.predicate)(val)
      });
   }, source);
}

// TODO: transduce for performance.
export function buildSpec(pmap: IPredicateMap, input: object, ...ignoredTokens: Token[]) {
  const applicable = omitBy(shouldIgnore(...ignoredTokens), input);
  const curried = evolve(transform(applicable), pick(keys(applicable), pmap));
  const spec = mergeAllWith(and, values(curried));
  return where(spec);
}
