import test from 'ava';
import { buildSpec, shouldIgnore } from '.';

const input = {
  name: 'johnny',
  from: 3,
  to: 6,
};

const filter = {
  name: { key: 'name', predicate: (expected, actual) => expected === actual },
  from: { key: 'amount', predicate: (expected, actual) => expected <= actual },
  to: { key: 'amount', predicate: (expected, actual) => expected >= actual }
};

test('null values should be omitted', t => {
  const underTest = null;
  const actual = shouldIgnore();
  t.true(actual(underTest));
});

test('undefined values should be omitted', t => {
  const underTest = undefined;
  const actual = shouldIgnore();
  t.true(actual(underTest));
});

test('empty string should be omitted', t => {
  const underTest = '';
  const actual = shouldIgnore();
  t.true(actual(underTest));
});

test('explicit ignore tokens should be omitted', t => {
  const token = 'All';
  const actual = shouldIgnore(token);
  t.true(actual(token));
});

test('spec should return true for objects that satisfy all the predicates', t => {
  const spec = buildSpec(filter, input);
  const underTest = { name: 'johnny', amount: 4 };
  t.true(spec(underTest));
});

test('spec should return false for objects that do not satisfy all the predicates', t => {
  const spec = buildSpec(filter, input);
  const underTest = { name: 'johnny', amount: 7 };
  t.false(spec(underTest));
});
