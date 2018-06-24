import { Configuration, IFormInput, ICriterion } from './criteria';

export * from './criteria';
export * from './spec-builder';

export type KeysOf<T> = {
    [ key: string ]: T
}

export function form(configuration: Configuration) {
    return <KeysOf<IFormInput>>configuration
}