type binaryPredicate<T> = (expected: T, actual: T) => boolean;

export interface PredicateDescriptor<T> {
  key: string;
  predicate: binaryPredicate<T>;
}

