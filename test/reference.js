import test from 'ava';
import Reference from '../lib/reference';

test('isChapter() returns true for chapter references', (t) => {
  let ref = new Reference('Genesis 1');
  t.true(ref.isChapter());
});

test('isChapter() returns false for verse references', (t) => {
  let ref = new Reference('Genesis 1:7');
  t.false(ref.isChapter());
});

test('isChapter() returns false for the first verse in a chapter', (t) => {
  let ref = new Reference('Genesis 1:1');
  t.false(ref.isChapter());
});

test('startOf("book") moves ref to start of book', (t) => {
  let ref = new Reference('Genesis 2:3');
  ref.startOf('book');
  t.is(ref.toVerseId(), 1);
});

test('startOf("chapter") moves ref to start of chapter', (t) => {
  let ref = new Reference('Genesis 1:4');
  ref.startOf('chapter');
  t.is(ref.toVerseId(), 1);
});

test('clone() creates a copy of the ref', (t) => {
  let ref1 = new Reference('Genesis 1:4');
  let ref2 = ref1.clone();
  ref1.startOf('chapter');
  t.not(ref1, ref2);
  t.not(ref1.toVerseId(), ref2.toVerseId());
});

test('toString() returns the text reference', (t) => {
  let ref = Reference.fromVerseId(32);
  t.is(ref.toString(), 'Genesis 2:1');
});

test('toVerseId() returns the verse id', (t) => {
  let ref = new Reference('Genesis 1:1');
  t.is(ref.toVerseId(), 1);
  ref = new Reference('Exodus 1:1');
  t.is(ref.toVerseId(), 1534);
});

test('toChapterId() returns the chapter id', (t) => {
  let ref = new Reference('Genesis 1:1');
  t.is(ref.toChapterId(), 1);
  ref = new Reference('Exodus 1:1');
  t.is(ref.toChapterId(), 51);
});

test('toBookId() returns the book id', (t) => {
  let ref = new Reference('Genesis 1:1');
  t.is(ref.toBookId(), 1);
  ref = new Reference('Exodus 1:1');
  t.is(ref.toBookId(), 2);
});

test('Reference.bookIdFromName() returns the book id', (t) => {
  t.is(Reference.bookIdFromName('Exodus'), 2);
});

test('Reference.bookNameFromId() returns the number of chapters in all books prior to the given book id', (t) => {
  t.is(Reference.bookNameFromId(2), 'Exodus');
});

test('Reference.fromChapterId() returns a reference instance for the chapter id', (t) => {
  t.is(Reference.fromChapterId(51).toString(), 'Exodus 1');
});

test('Reference.fromVerseId() returns a reference instance for the verse id', (t) => {
  t.is(Reference.fromVerseId(1534).toString(), 'Exodus 1:1');
});

test('Reference.versesInBookId() returns the total number of verses in that book', (t) => {
  t.is(Reference.versesInBookId(1), 1533); // Genesis
});

test('Reference.versesInChapterId() returns the total number of verses in that chapter', (t) => {
  t.is(Reference.versesInChapterId(51), 22); // Exodus 1
});

test('Reference.chaptersInBookId() returns the number of chapters in that book', (t) => {
  t.is(Reference.chaptersInBookId(1), 50); // Genesis
});

test('Reference.versesUpToBookId() returns the number of verses in all books prior to the given book id', (t) => {
  t.is(Reference.versesUpToBookId(3), 2746); // Leviticus
});

test('Reference.versesUpToChapterId() returns the number of verses in all chapters of all books prior to the given chapter id', (t) => {
  t.is(Reference.versesUpToChapterId(51), 1533); // Exodus 1
});

test('Reference.chaptersUpToBookId() returns the number of chapters in all books prior to the given book id', (t) => {
  t.is(Reference.chaptersUpToBookId(2), 50); // Exodus
});
