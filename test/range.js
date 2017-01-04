import test from 'ava';
import Reference from '../lib/reference';
import Range from '../lib/range';

test('distance() returns the distance between the References', (t) => {
  let start = new Reference('Genesis 1:1');
  let end = new Reference('Exodus 1:1');
  let range = new Range(start, end);
  let distance = range.distance();
  t.is(distance.books, 1);
  t.is(distance.chapters, 50);
  t.is(distance.verses, 1533);
});
