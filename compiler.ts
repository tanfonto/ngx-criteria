import { curry, mapObjIndexed, prop, where } from 'ramda';
// import { comp, map, remove } from 'transducers-js';
import { Criteria, ICriterion, IMap } from './types';

// const ignored = pipe(concat([ null, undefined, '' ]), flip(contains));
const m = <M extends object, K extends keyof M>(criteria: Criteria<M>, obj: M) => {
  return mapObjIndexed(({ key, pred, extract }: ICriterion<K>) => {
    const val: any = extract(prop(key, obj));
    return (v: any) => pred(val, v);
  }, criteria);
};

export function compile<M extends object>(
  criteria: IMap<ICriterion<M>>,
  exceptions: any[] = [ null, undefined ],
) {
  // const transform = ([ key, value ]) => {
  //   const { model, predicate } = criteria[key];
  //   return { [ key ]: { [ model ]: curry(predicate)(value) } };
  // };
  //
  // const conds = intoObj(comp(map(transform), remove(ignored(exceptions))));
  //
  // return (input: Props<any>) => curry(where)(conds(input));
}
