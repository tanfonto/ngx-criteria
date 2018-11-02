import test from 'ava';
import { spec } from '.';

const criteria = {
  name: { model: 'name', predicate: (expected, actual) => expected === actual },
  from: { model: 'amount', predicate: (expected, actual) => expected <= actual },
  to: { model: 'amount', predicate: (expected, actual) => expected >= actual }
};

test('spec should return true for objects that satisfy all the predicates', t => {
  const spec = spec(criteria);
  const underTest = { name: 'johnny', amount: 4 };
  t.true(spec(underTest));
});

test('spec should return false for objects that do not satisfy all the predicates', t => {
  const spec = spec(criteria);
  const underTest = { name: 'johnny', amount: 7 };
  t.false(spec(underTest));
});
