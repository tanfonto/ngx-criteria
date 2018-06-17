import { PredicateDescriptor } from "./predicate-descriptor";

export interface IPredicateMap {
  [ key: string ]: PredicateDescriptor<any>;
}
