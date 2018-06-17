type binaryPredicate<T> = (expected: T, actual: T) => boolean;

interface PredicateDescriptor<T> {
  key: string;
  predicate: binaryPredicate<T>;
}

