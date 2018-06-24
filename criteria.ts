import { KeysOf } from './';

export interface ICriterion {
    model: string;
    predicate: <T>(expected: T, actual: T) => boolean;    
}

export interface IFormInput {
    field: string;
    config: Array<any>
};

export type Configuration = KeysOf<IFormInput & ICriterion>;