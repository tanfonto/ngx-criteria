import test from 'ava';
import { mergeAllWith } from './utils';

test.beforeEach(t => {
  t.context['data'] = new Array<any>();
})

test('mergeAllWith should call function passed for all the common keys', t => {
  const ob1 = { a: 1, b: 2 };
  const ob2 = { a: 1, b: 2 };
  const withFn = function(x: object, y: object) {
    t.context['data'].push([ x, y ])
    return {};
  };

  mergeAllWith(withFn, [ ob1, ob2 ]);

  t.deepEqual(t.context['data'], [ [1, 1], [ 2, 2 ]]);
});

