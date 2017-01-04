var books = require('./books')

// Internally, no strings are stored - only numbers.
//
// "id"s are UIDs, numbers are relative to parent unit; e.g.
// Mark 2 and James 2 have different ids, but the same number.

function Reference(reference) {
  if (!reference) {
    throw new Error('You must supply a Bible reference, either a string (i.e. "Mark 2") or an object (i.e. { book: 1, chapter: 2, verse: 1 })');
  }

  // If reference is a string
  if (typeof reference === 'string') {

    // Strip out any periods, usually used for abbreviations, i.e. Mk. 2
    reference = reference.replace(/\./g,'');

    this.source = reference;

    // Match up to last letter - thats the book. Everything else === the chapter/verse
    var referenceParts = reference.match(/(.+[A-Za-z])\s+(.+)/);
    var bookName = referenceParts[1];
    var chapterAndVerse = referenceParts[2];

    // Lookup the book
    this.book = Reference.bookIdFromName(bookName);

    // Split on ":" for chapter and verse. If it's a chapter reference
    // (e.g. John 1) then @verse === undefined
    var chapterAndVerseParts = chapterAndVerse.split(':');
    this.chapter = Number(chapterAndVerseParts[0]);
    this.verse = chapterAndVerseParts[1] ? Number(chapterAndVerseParts[1]) : null;

  // If it's not a string, try parsing as an object
  } else {
    if (!reference.book) {
      throw new Error('The object you supplied does not seem to be a Bible reference (there is no "book" property)');
    }

    var hasBook = typeof reference.book === 'number';
    var hasChapter = typeof reference.chapter === 'number';
    var validVerseIfPresent = reference.verse == null || typeof reference.verse === 'number';

    if (hasBook && hasChapter && validVerseIfPresent) {
      this.book = reference.book;
      this.chapter = reference.chapter;
      this.verse = reference.verse;
    }
  }
}

// Is this a reference to a chapter as a whole, || a specific verse?
Reference.prototype.isChapter = function isChapter() {
  return this.verse == null;
}

// Like moment.js startOf - ref.startOf('chapter') sets the ref to the first
// verse in it's chapter
Reference.prototype.startOf = function startOf(unit) {
  if (unit === 'chapter') {
    this.verse = 1;
  } else if (unit === 'book') {
    this.verse = 1;
    this.chapter = 1;
  } else {
    throw new Error('Unknown unit ' + unit + ' supplied to startOf() - supported units are: "book", "chapter"');
  }
  return this;
};

// Clone to avoid operations by reference to your existing refs
Reference.prototype.clone = function clone() {
  return new Reference(this);
};

// String formatting
Reference.prototype.toString = function toString() {
  var bookName = books[this.book - 1].names[0];
  var stringified = bookName + " " + this.chapter;
 if (this.verse != null) {
    stringified += ":" + this.verse;
  }
  return stringified;
};

// Get the verse id for this reference
Reference.prototype.toVerseId = function toVerseId() {
  var verseCount = 0;
  var bookIndex = this.book - 1;
  while(bookIndex >= 1) {
    verseCount += Reference.versesInBookId(bookIndex);
    bookIndex -= 1;
  }
  var chapterIndex = this.chapter - 1;
  while(chapterIndex >= 1) {
    verseCount += Reference.versesInBookId(bookIndex);
    verseCount += books[this.book - 1].verses[chapterIndex];
  }
  if (this.verse != null) {
    verseCount += this.verse;
  }
  return verseCount;
};

// Get the chapter id for this reference
Reference.prototype.toChapterId = function toChapterId() {
  var previousBookChapters = Reference.chaptersUpToBookId(this.book);
  return previousBookChapters + this.chapter;
};

// Get the book id for this reference
Reference.prototype.toBookId = function toBookId() {
  return this.book;
};

// When doing math, use verse id as the value
Reference.prototype.valueOf = function valueOf() {
  return this.toVerseId();
};

// Given a string of a book name (shortened or full length), get the book id
Reference.bookIdFromName = function bookIdFromName(name) {
  name = name.toLowerCase();
  var book = books.find(function(book) {
    var bookNames = book.names.map(function(n) { return n.toLowerCase() });
    return bookNames.indexOf(name) > -1;
  });
  if (book) {
    return books.indexOf(book) + 1;
  }
  throw new Error('No book matched "' + name + '"');
};

// Given a book id, get the full length book name
Reference.bookNameFromId = function bookNameFromId(id) {
  var book = books[id - 1];
  if (!book) {
    throw new Error('Book id out of range (no such book)');
  }
  return book.names[0];
};

// Create a Reference from a chapter id. Count up through the books to find
// that number chapter
Reference.fromChapterId = function fromChapterId(chapterId) {
  var chaptersRemaining = chapterId;
  var bookIndex = 0;
  while(chaptersRemaining > 0) {
    var chaptersInThisBook = books[bookIndex].verses.length;
    if (chaptersRemaining - chaptersInThisBook <= 0) {
      return new Reference({ book: bookIndex + 1, chapter: chaptersRemaining });
    }
    chaptersRemaining -= chaptersInThisBook;
    bookIndex += 1;
  }
  throw new Error('There was a problem creating the a reference from chapter id ' + chapterId);
};

// Create a Reference from a verse id
Reference.fromVerseId = function fromVerseId(verseId) {
  var versesRemaining = verseId;
  var bookIndex = 0;
  while(versesRemaining > 0) {
    var versesInThisBook = Reference.versesInBookId(bookIndex + 1);
    if (versesRemaining - versesInThisBook < 0) {
      var book = books[bookIndex];
      var chapterIndex = 0;
      while(versesRemaining > 0) {
        var versesInThisChapter = book.verses[chapterIndex];
        if (versesRemaining - versesInThisChapter < 0) {
          return new Reference({ book: bookIndex + 1, chapter: chapterIndex + 1, verse: versesRemaining });
        }
        versesRemaining -= versesInThisChapter;
        chapterIndex += 1;
      }
    }
    versesRemaining -= versesInThisBook;
    bookIndex += 1;
  }
};

// Get the number of verses in the given book id
Reference.versesInBookId = function versesInBookId(bookId) {
  return books[bookId - 1].verses.reduce(function sum(a, b) { return a + b });
};

// Get the number of verses in the given chapter id
Reference.versesInChapterId = function versesInChapterId(chapterId) {
  var reference = Reference.fromChapterId(chapterId);
  return books[reference.book - 1].verses[reference.chapter - 1];
};

// Get the number of chapters in the given book id
Reference.chaptersInBookId = function chaptersInBookId(bookId) {
  return books[bookId - 1].verses.length;
};

// Get the number of verses up to the start of the given book id
Reference.versesUpToBookId = function versesUpToBookId(bookId) {
  var count = 0;
  var booksLeft = bookId - 1;
  while(booksLeft > 0) {
    count += Reference.versesInBookId(booksLeft);
    booksLeft -= 1;
  }
  return count;
};

// Get the number of verses up to the start of the given chapter id
Reference.versesUpToChapterId = function versesUpToChapterId(chapterId) {
  var count = 0;
  var chaptersLeft = chapterId - 1;
  while(chaptersLeft > 0) {
    count += Reference.versesInChapterId(chaptersLeft);
    chaptersLeft -= 1;
  }
  return count;
};

// Get the number of chapters up to the start of the given book id
Reference.chaptersUpToBookId = function chaptersUpToBookId(bookId) {
  var count = 0;
  var booksLeft = bookId - 1;
  while(booksLeft > 0) {
    count += Reference.chaptersInBookId(booksLeft);
    booksLeft -= 1;
  }
  return count;
};


module.exports = Reference;
