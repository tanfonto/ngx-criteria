export type Func<T = any, R = any> = (...args: T[]) => R;
export type Predicate<T = any> = Func<T, boolean>;

export interface IMap<T = any> {
  [ key: string ]: T;
}

export interface ICriterion<K> {
  key: K;
  pred: Predicate<K>;
  extract: <In, Out>(val: In) => Out;
}

export type Criteria<M extends object> = IMap<ICriterion<keyof M>> & object;
