import { and, any, curry, equals, evolve, mapObjIndexed, values, where, mapAccum, forEachObjIndexed } from 'ramda';
import { isNilOrEmpty, omitBy } from 'ramda-adjunct';
import { ICriterion, IFormInput } from './criteria';
import { mergeAllWith } from './utils/ramda';
import { KeysOf } from '.';

export const shouldIgnore = (...tokens: any[]) => {
  return function(item: any) {
    return isNilOrEmpty(item) || any(equals(item), tokens);
  }
}

function transform(input: object) {
  return mapObjIndexed((val: any) => {
    return (criterion: ICriterion) => ({
        [ criterion.model ]: curry(criterion.predicate)(val)
      });
   }, input);
}

export function buildSpec(
  criteria: KeysOf<ICriterion>, 
  form: object, 
  ...ignoredTokens: any[]
) {
  const specified = omitBy(shouldIgnore(...ignoredTokens), form);
  const applicable = evolve(transform(specified), criteria);
  const spec = mergeAllWith(and, values(applicable));
  return where(spec);
}
